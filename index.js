// Servidor principal de NetFlash con Node.js
const express = require('express');
const path = require('path');
const { execFile, spawn } = require('child_process');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const dns = require('dns').promises;
const net = require('net');
const tls = require('tls');
const whois = require('whois-json');
const JSZip = require('jszip');
const cheerio = require('cheerio');
const fetch2 = require('node-fetch');

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

// Ruta para datos falsos
app.get('/datosfake', (req, res) => {
  res.sendFile(path.join(__dirname, 'assets', 'datosfake.html'));
});

// Ruta para herramientas de red
app.get('/dominiosred', (req, res) => {
  res.sendFile(path.join(__dirname, 'assets', 'DominiosRed.html'));
});

// Nueva ruta para la herramienta de scrapping HTML
app.get('/scrappinghtml', (req, res) => {
  res.sendFile(path.join(__dirname, 'assets', 'scrappingHtml.html'));
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

app.get('/api/redtools', async (req, res) => {
  const { host } = req.query;
  if (!host) return res.status(400).json({ error: 'Falta el parámetro host' });
  let dominio = host.replace(/^https?:\/\//, '').replace(/\/$/, '').split('/')[0];
  let result = { identidad: {}, dns: {}, whois: {}, geo: {}, ping: {}, puertos: {}, cabeceras: {}, ssl: {}, proteccion: {}, enlaces: {} };
  // 1. IP y reverse DNS
  try {
    const ips = await dns.resolve4(dominio);
    result.identidad.ip = ips[0];
    const ptr = await dns.reverse(ips[0]);
    result.identidad.reverse = ptr;
  } catch (e) {
    result.identidad.ip = null;
    result.identidad.reverse = null;
  }
  result.identidad.dominio = dominio;
  // 2. DNS
  try {
    result.dns.A = await dns.resolve4(dominio).catch(()=>[]);
    result.dns.AAAA = await dns.resolve6(dominio).catch(()=>[]);
    result.dns.MX = await dns.resolveMx(dominio).catch(()=>[]);
    result.dns.TXT = await dns.resolveTxt(dominio).catch(()=>[]);
    result.dns.CNAME = await dns.resolveCname(dominio).catch(()=>[]);
    result.dns.PTR = result.identidad.ip ? await dns.reverse(result.identidad.ip).catch(()=>[]) : [];
    result.dns.DNSSEC = [];
  } catch (e) {}
  // 3. WHOIS
  try {
    result.whois = await whois(dominio);
  } catch (e) { result.whois = { error: 'No disponible' }; }
  // 4. Geolocalización
  try {
    const ip = result.identidad.ip;
    if (ip) {
      const [geo1, geo2, geo3] = await Promise.all([
        fetch(`http://ip-api.com/json/${ip}`).then(r=>r.json()).catch(()=>null),
        fetch(`https://ipwho.is/${ip}`).then(r=>r.json()).catch(()=>null),
        fetch(`https://ipinfo.io/${ip}/json`).then(r=>r.json()).catch(()=>null)
      ]);
      result.geo = { 'ip-api': geo1, 'ipwhois': geo2, 'ipinfo': geo3 };
    }
  } catch (e) { result.geo = {}; }
  // 5. Ping
  try {
    const start = Date.now();
    const socket = net.createConnection(80, dominio);
    await new Promise((resolve, reject) => {
      socket.on('connect', () => { socket.end(); resolve(); });
      socket.on('error', reject);
      setTimeout(()=>reject('timeout'), 3000);
    });
    result.ping.ms = Date.now() - start;
  } catch (e) { result.ping.ms = null; }
  // 6. Puertos comunes
  const puertos = [80, 443, 8080, 21, 22, 25, 53, 110, 143, 3306, 3389];
  result.puertos = {};
  await Promise.all(puertos.map(p => new Promise(resolve => {
    const s = net.createConnection(p, dominio);
    let abierto = false;
    s.on('connect', () => { abierto = true; s.end(); });
    s.on('close', () => { result.puertos[p] = abierto ? 'abierto' : 'cerrado'; resolve(); });
    s.on('error', () => { result.puertos[p] = 'cerrado'; resolve(); });
    setTimeout(()=>{ result.puertos[p] = 'timeout'; s.destroy(); resolve(); }, 2000);
  })));
  // 7. Cabeceras HTTP
  try {
    const resp = await fetch('http://' + dominio, { method: 'HEAD' });
    result.cabeceras = Object.fromEntries(resp.headers.entries());
  } catch (e) { result.cabeceras = { error: 'No disponible' }; }
  // 8. SSL
  try {
    await new Promise((resolve, reject) => {
      const socket = tls.connect(443, dominio, { servername: dominio, rejectUnauthorized: false }, () => {
        result.ssl = {
          autorizado: socket.authorized,
          sujeto: socket.getPeerCertificate(),
          protocolo: socket.getProtocol(),
          cipher: socket.getCipher()
        };
        socket.end();
        resolve();
      });
      socket.on('error', reject);
      setTimeout(()=>reject('timeout'), 3000);
    });
  } catch (e) { result.ssl = { error: 'No disponible' }; }
  // 9. Protección DDoS
  try {
    const server = result.cabeceras.server ? result.cabeceras.server.toLowerCase() : '';
    if (server.includes('cloudflare')) result.proteccion = 'Cloudflare';
    else if (server.includes('sucuri')) result.proteccion = 'Sucuri';
    else if (server.includes('akamai')) result.proteccion = 'Akamai';
    else if (server.includes('incapsula')) result.proteccion = 'Incapsula';
    else result.proteccion = 'No detectada';
  } catch (e) { result.proteccion = 'No detectada'; }
  // 10. Enlaces útiles
  result.enlaces = {
    ssl: `https://www.ssllabs.com/ssltest/analyze.html?d=${dominio}`,
    virustotal: `https://www.virustotal.com/gui/domain/${dominio}`,
    shodan: `https://www.shodan.io/search?query=${dominio}`,
    mxtoolbox: `https://mxtoolbox.com/SuperTool.aspx?action=mx%3a${dominio}`,
    viewdns: `https://viewdns.info/reverseip/?host=${dominio}&t=1`,
    crtsh: `https://crt.sh/?q=%25.${dominio}`,
    robots: `https://${dominio}/robots.txt`,
    sitemap: `https://${dominio}/sitemap.xml`,
    favicon: `https://${dominio}/favicon.ico`,
    headers: `https://httpbin.org/headers`,
    ipinfo: result.identidad.ip ? `https://ipinfo.io/${result.identidad.ip}` : '',
    ipwhois: result.identidad.ip ? `https://ipwho.is/${result.identidad.ip}` : ''
  };
  res.json(result);
});

// Endpoint para obtener el HTML de una página
app.get('/api/scrappinghtml', async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: 'Falta el parámetro url' });
  try {
    const response = await fetch(url, { method: 'GET', headers: { 'User-Agent': 'Mozilla/5.0' } });
    const html = await response.text();
    res.json({ html });
  } catch (e) {
    res.status(500).json({ error: 'No se pudo obtener el HTML: ' + e.message });
  }
});

app.get('/api/scrappingzip', async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: 'Falta el parámetro url' });
  try {
    const baseUrl = url.endsWith('/') ? url : url + '/';
    const mainRes = await fetch2(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const html = await mainRes.text();
    const $ = cheerio.load(html);
    const zip = new JSZip();
    zip.file('index.html', html);
    // CSS
    const cssLinks = [];
    $('link[rel="stylesheet"]').each((i, el) => {
      let href = $(el).attr('href');
      if (href && !href.startsWith('data:')) cssLinks.push(href);
    });
    // JS
    const jsLinks = [];
    $('script[src]').each((i, el) => {
      let src = $(el).attr('src');
      if (src && !src.startsWith('data:')) jsLinks.push(src);
    });
    // Favicon
    let favicon = $('link[rel="icon"]').attr('href') || '/favicon.ico';
    // Descargar y agregar archivos
    async function fetchAndAdd(fileUrl, name) {
      try {
        let fullUrl = fileUrl.startsWith('http') ? fileUrl : (fileUrl.startsWith('/') ? (new URL(fileUrl, url)).href : baseUrl + fileUrl);
        const r = await fetch2(fullUrl);
        if (!r.ok) return;
        const buf = await r.buffer();
        zip.file(name, buf);
      } catch {}
    }
    await Promise.all(cssLinks.map((href, i) => fetchAndAdd(href, `css/style${i+1}.css`)));
    await Promise.all(jsLinks.map((src, i) => fetchAndAdd(src, `js/script${i+1}.js`)));
    if (favicon) await fetchAndAdd(favicon, 'favicon.ico');
    // Generar ZIP
    const zipBuf = await zip.generateAsync({ type: 'nodebuffer' });
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename="scrapping.zip"');
    res.send(zipBuf);
  } catch (e) {
    res.status(500).json({ error: 'No se pudo crear el ZIP: ' + e.message });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`NetFlash corriendo en http://localhost:${PORT}`);
}); 