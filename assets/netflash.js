// Obtener información de IP y proveedor
fetch('/api/ipinfo')
  .then(res => res.json())
  .then(data => {
    document.getElementById('ip').textContent = data.ip || 'Desconocido';
    document.getElementById('isp').textContent = data.org || 'Desconocido';
    document.getElementById('country').textContent = data.country || 'Desconocido';
  });

// Inicializar gráfica de velocidad
let speedChart;
const ctx = document.getElementById('speedChart').getContext('2d');
speedChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Descarga', 'Subida', 'Ping'],
    datasets: [{
      label: 'Velocidad',
      data: [0, 0, 0],
      backgroundColor: [
        'rgba(0, 255, 174, 0.2)',
        'rgba(255, 193, 7, 0.2)',
        'rgba(40, 167, 69, 0.2)'
      ],
      borderColor: [
        'rgba(0, 255, 174, 1)',
        'rgba(255, 193, 7, 1)',
        'rgba(40, 167, 69, 1)'
      ],
      borderWidth: 2,
      pointRadius: 6,
      pointHoverRadius: 10,
      fill: true,
      tension: 0.4
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: '#fff' },
        grid: { color: '#444' }
      },
      x: {
        ticks: { color: '#fff' },
        grid: { color: '#444' }
      }
    }
  }
});

// Simulación de test de velocidad
function simulateSpeedTest() {
  document.getElementById('downloadSpeed').textContent = '...';
  document.getElementById('uploadSpeed').textContent = '...';
  document.getElementById('ping').textContent = '...';

  let download = 0, upload = 0, ping = 0;
  let step = 0;
  const steps = 30;
  const downloadTarget = (Math.random() * 80 + 20).toFixed(2); // 20-100 Mbps
  const uploadTarget = (Math.random() * 30 + 5).toFixed(2);    // 5-35 Mbps
  const pingTarget = (Math.random() * 40 + 10).toFixed(0);     // 10-50 ms

  const interval = setInterval(() => {
    step++;
    download = (downloadTarget * (step / steps)).toFixed(2);
    upload = (uploadTarget * (step / steps)).toFixed(2);
    ping = (pingTarget * (step / steps)).toFixed(0);

    document.getElementById('downloadSpeed').textContent = download + ' Mbps';
    document.getElementById('uploadSpeed').textContent = upload + ' Mbps';
    document.getElementById('ping').textContent = ping + ' ms';

    speedChart.data.datasets[0].data = [download, upload, ping];
    speedChart.update();

    if (step >= steps) {
      clearInterval(interval);
      document.getElementById('downloadSpeed').textContent = downloadTarget + ' Mbps';
      document.getElementById('uploadSpeed').textContent = uploadTarget + ' Mbps';
      document.getElementById('ping').textContent = pingTarget + ' ms';
      speedChart.data.datasets[0].data = [downloadTarget, uploadTarget, pingTarget];
      speedChart.update();
    }
  }, 40);
}

document.getElementById('startTest').addEventListener('click', simulateSpeedTest); 