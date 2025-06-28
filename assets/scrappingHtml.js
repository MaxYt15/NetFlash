document.getElementById('scrapForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const url = document.getElementById('url').value.trim();
  const resultBox = document.getElementById('resultBox');
  const htmlBox = document.getElementById('htmlBox');
  resultBox.style.display = 'block';
  htmlBox.textContent = 'Cargando...';
  try {
    const res = await fetch(`/api/scrappinghtml?url=${encodeURIComponent(url)}`);
    const data = await res.json();
    if (data.html) {
      htmlBox.textContent = data.html;
      document.getElementById('copyBtn').onclick = () => {
        navigator.clipboard.writeText(data.html);
      };
      document.getElementById('downloadBtn').onclick = () => {
        const blob = new Blob([data.html], {type:'text/html'});
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'index.html';
        a.click();
        URL.revokeObjectURL(a.href);
      };
    } else {
      htmlBox.textContent = 'No se pudo obtener el HTML.';
    }
  } catch (err) {
    htmlBox.textContent = 'Error al obtener el HTML.';
  }
});

// Botón para descargar ZIP de recursos
const zipBox = document.getElementById('zipBox');
const downloadZipBtn = document.getElementById('downloadZipBtn');
const zipStatus = document.getElementById('zipStatus');

downloadZipBtn.onclick = async function() {
  const url = document.getElementById('url').value.trim();
  zipStatus.textContent = 'Preparando ZIP...';
  downloadZipBtn.disabled = true;
  try {
    const res = await fetch(`/api/scrappingzip?url=${encodeURIComponent(url)}`);
    if (!res.ok) throw new Error('No se pudo descargar el ZIP');
    const blob = await res.blob();
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'scrapping.zip';
    a.click();
    URL.revokeObjectURL(a.href);
    zipStatus.textContent = 'ZIP descargado correctamente.';
  } catch (e) {
    zipStatus.textContent = 'Error al descargar el ZIP.';
  }
  downloadZipBtn.disabled = false;
};

// Mostrar el botón ZIP solo si hay URL válida
const scrapForm = document.getElementById('scrapForm');
scrapForm.addEventListener('submit', function() {
  zipBox.style.display = 'block';
  zipStatus.textContent = '';
}); 