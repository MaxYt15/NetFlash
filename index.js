// Servidor principal de NetFlash con Node.js
const express = require('express');
const path = require('path');
const { execFile, spawn } = require('child_process');

const app = express();
const PORT = 3000;

// Servir archivos estáticos
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Ruta camuflada para el generador de BINS
app.get('/genbins', (req, res) => {
  res.sendFile(path.join(__dirname, 'assets', 'genbins.html'));
});

// Ruta camuflada para correos temporales
app.get('/correotemp', (req, res) => {
  res.sendFile(path.join(__dirname, 'assets', 'correotemp.html'));
});

// Endpoint para test de velocidad usando el binario oficial de Speedtest CLI
app.get('/api/speedtest', (req, res) => {
  // Cambia la ruta si el binario está en otro lugar
  const speedtestPath = path.join(__dirname, 'speedtest.exe');
  execFile(speedtestPath, ['--accept-license', '--accept-gdpr', '-f', 'json'], (error, stdout, stderr) => {
    if (error) {
      return res.json({ error: error.message });
    }
    try {
      const result = JSON.parse(stdout);
      res.json({
        download: (result.download.bandwidth * 8 / 1e6).toFixed(2), // Mbps
        upload: (result.upload.bandwidth * 8 / 1e6).toFixed(2),     // Mbps
        ping: result.ping.latency.toFixed(2)
      });
    } catch (e) {
      res.json({ error: 'No se pudo parsear el resultado de Speedtest CLI.' });
    }
  });
});

// Endpoint SSE para progreso en tiempo real de speedtest
app.get('/api/speedtest-stream', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const speedtestPath = path.join(__dirname, 'speedtest.exe');
  const st = spawn(speedtestPath, ['--accept-license', '--accept-gdpr']);

  st.stdout.setEncoding('utf8');
  let download = null, upload = null, ping = null;

  st.stdout.on('data', (data) => {
    // Parsear progreso de descarga
    const lines = data.split('\n');
    lines.forEach(line => {
      // Ping
      const pingMatch = line.match(/Idle Latency\s*:\s*([\d.]+) ms/);
      if (pingMatch) {
        ping = parseFloat(pingMatch[1]);
        res.write(`data: ${JSON.stringify({ type: 'ping', value: ping })}\n\n`);
      }
      // Download
      const dlMatch = line.match(/Download\s*:\s*([\d.]+) Mbps/);
      if (dlMatch) {
        download = parseFloat(dlMatch[1]);
        res.write(`data: ${JSON.stringify({ type: 'download', value: download })}\n\n`);
      }
      // Upload
      const ulMatch = line.match(/Upload\s*:\s*([\d.]+) Mbps/);
      if (ulMatch) {
        upload = parseFloat(ulMatch[1]);
        res.write(`data: ${JSON.stringify({ type: 'upload', value: upload })}\n\n`);
      }
      // Progreso de barras
      const barMatch = line.match(/\[(=+)\s*\]\s*(\d+)%/);
      if (barMatch) {
        const percent = parseInt(barMatch[2]);
        res.write(`data: ${JSON.stringify({ type: 'progress', value: percent })}\n\n`);
      }
    });
  });

  st.on('close', () => {
    res.write('event: end\ndata: done\n\n');
    res.end();
  });

  st.stderr.on('data', (data) => {
    res.write(`data: ${JSON.stringify({ type: 'error', value: data.toString() })}\n\n`);
  });

  req.on('close', () => {
    st.kill();
  });
});

// Proxy para la API de 1secmail (evita CORS)
app.get('/api/1secmail', async (req, res) => {
  const { login, domain, action, id } = req.query;
  if (!login || !domain || !action) {
    return res.status(400).json({ error: 'Faltan parámetros requeridos' });
  }
  let url = `https://www.1secmail.com/api/v1/?action=${action}&login=${login}&domain=${domain}`;
  if (action === 'readMessage' && id) url += `&id=${id}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error('Error de 1secmail:', response.status, await response.text());
      return res.status(response.status).json({ error: 'Error de 1secmail' });
    }
    const data = await response.json();
    res.json(data);
  } catch (e) {
    console.error('Error al consultar 1secmail:', e);
    res.status(500).json({ error: 'Error al consultar 1secmail' });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`NetFlash corriendo en http://localhost:${PORT}`);
}); 