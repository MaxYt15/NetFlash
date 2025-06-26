// Obtener información de IP y proveedor directamente desde el frontend
fetch('https://ipinfo.io/json')
  .then(res => res.json())
  .then(data => {
    document.getElementById('ip').textContent = data.ip || 'Desconocido';
    document.getElementById('isp').textContent = data.org || 'Desconocido';
    document.getElementById('country').textContent = data.country || 'Desconocido';
  })
  .catch(() => {
    document.getElementById('ip').textContent = 'Desconocido';
    document.getElementById('isp').textContent = 'Desconocido';
    document.getElementById('country').textContent = 'Desconocido';
  });

// Configuración del velocímetro Gauge.js
var gaugeOpts = {
  angle: 0.15, // El ángulo de inicio y fin del gauge
  lineWidth: 0.44,
  radiusScale: 1,
  pointer: {
    length: 0.6,
    strokeWidth: 0.035,
    color: '#00ffae'
  },
  limitMax: false,
  limitMin: false,
  colorStart: '#00ffae',
  colorStop: '#007bff',
  strokeColor: '#222',
  generateGradient: true,
  highDpiSupport: true,
  staticZones: [
    {strokeStyle: "#00ffae", min: 0, max: 50},
    {strokeStyle: "#ffc107", min: 50, max: 100},
    {strokeStyle: "#dc3545", min: 100, max: 200}
  ],
  staticLabels: {
    font: "14px Segoe UI",
    labels: [0, 25, 50, 100, 200],
    color: "#fff",
    fractionDigits: 0
  }
};
var gaugeTarget = document.getElementById('gauge');
var gauge = new Gauge(gaugeTarget).setOptions(gaugeOpts);
gauge.maxValue = 200;
gauge.setMinValue(0);
gauge.animationSpeed = 32;
gauge.set(0);
document.getElementById('gaugeLabel').textContent = '0 Mbps';
document.getElementById('gaugeType').textContent = 'Descarga';

// Integrar Librespeed para test real de velocidad
(function() {
  if (!window.Speedtest) {
    var script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/gh/librespeed/speedtest@master/speedtest.js';
    script.onload = setupSpeedTest;
    document.head.appendChild(script);
  } else {
    setupSpeedTest();
  }
})();

function setupSpeedTest() {
  var s = new Speedtest();

  function iniciarTest() {
    // Deshabilita el botón mientras corre el test
    const btn = document.getElementById('startTest');
    btn.disabled = true;
    btn.textContent = 'Test en curso...';

    // Evita iniciar un nuevo test si ya hay uno corriendo
    if (s.getState() !== 0) {
      return;
    }

    document.getElementById('downloadSpeed').textContent = '...';
    document.getElementById('uploadSpeed').textContent = '...';
    document.getElementById('ping').textContent = '...';
    gauge.set(0);
    document.getElementById('gaugeLabel').textContent = '0 Mbps';
    document.getElementById('gaugeType').textContent = 'Descarga';

    // Configurar servidor público de Librespeed
    s.setParameter("server", {
      name: "Librespeed Public",
      server: "https://speedtest.serverius.net/",
      dlURL: "garbage.php",
      ulURL: "empty.php",
      pingURL: "empty.php",
      getIpURL: "getIP.php"
    });

    s.onupdate = function(data) {
      // Descarga
      if (typeof data.dlStatus !== 'undefined' && s.getState() === 1) {
        document.getElementById('downloadSpeed').textContent = data.dlStatus + ' Mbps';
        gauge.set(parseFloat(data.dlStatus) || 0);
        document.getElementById('gaugeLabel').textContent = data.dlStatus + ' Mbps';
        document.getElementById('gaugeType').textContent = 'Descarga';
      }
      // Subida
      if (typeof data.ulStatus !== 'undefined' && s.getState() === 3) {
        document.getElementById('uploadSpeed').textContent = data.ulStatus + ' Mbps';
        gauge.set(parseFloat(data.ulStatus) || 0);
        document.getElementById('gaugeLabel').textContent = data.ulStatus + ' Mbps';
        document.getElementById('gaugeType').textContent = 'Subida';
      }
      // Ping
      if (typeof data.pingStatus !== 'undefined' && s.getState() === 4) {
        document.getElementById('ping').textContent = data.pingStatus + ' ms';
        gauge.set(parseFloat(data.pingStatus) || 0);
        document.getElementById('gaugeLabel').textContent = data.pingStatus + ' ms';
        document.getElementById('gaugeType').textContent = 'Ping';
      }
    };
    s.onend = function(aborted) {
      // Habilita el botón al terminar
      btn.disabled = false;
      btn.textContent = 'Iniciar Test';
    };
    s.start();
  }

  document.getElementById('startTest').addEventListener('click', iniciarTest);
} 