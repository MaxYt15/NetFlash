// Servidor principal de NetFlash con Node.js
const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = 3000;

// Servir archivos estáticos
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint para obtener IP y proveedor
app.get('/api/ipinfo', async (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  try {
    const response = await fetch(`https://ipinfo.io/${ip}/json`);
    const data = await response.json();
    res.json(data);
  } catch (e) {
    res.json({ ip, org: 'Desconocido', country: 'Desconocido' });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`NetFlash corriendo en http://localhost:${PORT}`);
}); 