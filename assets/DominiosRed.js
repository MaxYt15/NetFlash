// Herramientas de Red PRO: suite extendida sin API key
const redForm = document.getElementById('redForm');
const resultBox = document.getElementById('resultBox');
const exportBtn = document.getElementById('exportBtn');

function extraerDominio(input) {
  let dom = input.trim();
  dom = dom.replace(/^https?:\/\//, '');
  dom = dom.replace(/\/$/, '');
  dom = dom.split('/')[0];
  return dom;
}

function esIP(valor) {
  return /^\d{1,3}(\.\d{1,3}){3}$/.test(valor) || /^[a-fA-F0-9:]+$/.test(valor);
}

async function fetchJSON(url, opts) {
  try {
    const res = await fetch(url, opts);
    return await res.json();
  } catch {
    return null;
  }
}

async function analizarRed(input) {
  resultBox.style.display = 'block';
  resultBox.innerHTML = '<span class="text-info">Analizando...</span>';
  let dominio = extraerDominio(input);
  let info = await fetch(`/api/redtools?host=${encodeURIComponent(dominio)}`).then(r=>r.json());
  mostrarResultados(info);
  return info;
}

function icono(tipo, color) {
  return `<i class="fa-solid fa-${tipo}" style="color:${color};margin-right:6px;"></i>`;
}

function copiar(texto) {
  navigator.clipboard.writeText(texto);
}

function tooltip(text, icon) {
  return `<span title='${text}' style='cursor:help;'>${icon}</span>`;
}

function colapsable(titulo, contenido, id, abierto) {
  // id único por análisis usando el id base + sufijo de dominio/ip/timestamp
  const sufijo = window._analisisSufijo || Math.random().toString(36).slice(2,10);
  const collapseId = `c${id}_${sufijo}`;
  return `<div class='accordion-item'><h2 class='accordion-header'><button class='accordion-button${abierto ? '' : ' collapsed'}' type='button' data-bs-toggle='collapse' data-bs-target='#${collapseId}' aria-expanded='${abierto ? 'true' : 'false'}'>${titulo}</button></h2><div id='${collapseId}' class='accordion-collapse collapse${abierto ? ' show' : ''}'><div class='accordion-body'>${contenido || '<span class="text-warning">No disponible</span>'}</div></div></div>`;
}

function renderSSLDetails(ssl) {
  if (!ssl || ssl.error) return '<span class="text-warning">No disponible</span>';
  let html = '<ul>';
  if(ssl.autorizado!==undefined) html += `<li><b>Autorizado:</b> ${ssl.autorizado ? 'Sí' : 'No'}</li>`;
  if(ssl.protocolo) html += `<li><b>Protocolo:</b> ${ssl.protocolo}</li>`;
  if(ssl.cipher && ssl.cipher.name) html += `<li><b>Cipher:</b> ${ssl.cipher.name}</li>`;
  if(ssl.sujeto && ssl.sujeto.subject) {
    html += `<li><b>CN:</b> ${ssl.sujeto.subject.CN || '-'}</li>`;
    if(ssl.sujeto.issuer) html += `<li><b>Emisor:</b> ${ssl.sujeto.issuer.CN || '-'}</li>`;
    if(ssl.sujeto.valid_from) html += `<li><b>Válido desde:</b> ${ssl.sujeto.valid_from}</li>`;
    if(ssl.sujeto.valid_to) html += `<li><b>Válido hasta:</b> ${ssl.sujeto.valid_to}</li>`;
    if(ssl.sujeto.subjectaltname) html += `<li><b>Alt Names:</b> ${ssl.sujeto.subjectaltname}</li>`;
    if(ssl.sujeto.fingerprint) html += `<li><b>Fingerprint:</b> ${ssl.sujeto.fingerprint}</li>`;
    if(ssl.sujeto.fingerprint256) html += `<li><b>Fingerprint256:</b> ${ssl.sujeto.fingerprint256}</li>`;
    if(ssl.sujeto.fingerprint512) html += `<li><b>Fingerprint512:</b> ${ssl.sujeto.fingerprint512}</li>`;
    if(ssl.sujeto.serialNumber) html += `<li><b>Serial:</b> ${ssl.sujeto.serialNumber}</li>`;
    if(ssl.sujeto.infoAccess) {
      html += `<li><b>Info Access:</b><ul>`;
      Object.entries(ssl.sujeto.infoAccess).forEach(([k,v])=>{
        html += `<li><b>${k}:</b> ${(Array.isArray(v)?v.join(', '):v)}</li>`;
      });
      html += '</ul></li>';
    }
    if(ssl.sujeto.ext_key_usage) html += `<li><b>Ext Key Usage:</b> ${ssl.sujeto.ext_key_usage.join(', ')}</li>`;
  }
  if(ssl.sujeto && ssl.sujeto.issuer) {
    html += `<li><b>Emisor completo:</b><ul>`;
    Object.entries(ssl.sujeto.issuer).forEach(([k,v])=>{
      html += `<li><b>${k}:</b> ${v}</li>`;
    });
    html += '</ul></li>';
  }
  if(ssl.sujeto && ssl.sujeto.subject) {
    html += `<li><b>Subject completo:</b><ul>`;
    Object.entries(ssl.sujeto.subject).forEach(([k,v])=>{
      html += `<li><b>${k}:</b> ${v}</li>`;
    });
    html += '</ul></li>';
  }
  if(ssl.sujeto && ssl.sujeto.pubkey && ssl.sujeto.pubkey.data) {
    html += `<li><b>Public Key (bytes):</b> [${ssl.sujeto.pubkey.data.slice(0,10).join(', ')}... (${ssl.sujeto.pubkey.data.length} bytes)]</li>`;
  }
  if(ssl.sujeto && ssl.sujeto.nistCurve) html += `<li><b>NIST Curve:</b> ${ssl.sujeto.nistCurve}</li>`;
  if(ssl.sujeto && ssl.sujeto.asn1Curve) html += `<li><b>ASN1 Curve:</b> ${ssl.sujeto.asn1Curve}</li>`;
  if(ssl.sujeto && ssl.sujeto.bits) html += `<li><b>Bits:</b> ${ssl.sujeto.bits}</li>`;
  if(ssl.sujeto && ssl.sujeto.ca!==undefined) html += `<li><b>CA:</b> ${ssl.sujeto.ca?'Sí':'No'}</li>`;
  html += '</ul>';
  return html;
}

function mostrarResultados(info) {
  let html = '';
  // Identidad
  html += `<div class='card mb-3 p-3'><b>${icono('globe','deepskyblue')}Dominio:</b> ${info.identidad.dominio || '-'}<br><b>${icono('location-dot','orange')}IP:</b> ${info.identidad.ip || '-'}<br><b>${icono('undo','brown')}Reverse DNS:</b> ${(info.identidad.reverse && info.identidad.reverse.length) ? info.identidad.reverse.join(', ') : '-'}</div>`;
  // DNS
  html += `<div class='mb-3'><h5>${icono('server','purple')}DNS</h5><ul>`;
  ['A','AAAA','MX','TXT','CNAME','PTR','DNSSEC'].forEach(tipo => {
    if (info.dns && info.dns[tipo] && info.dns[tipo].length)
      html += `<li><b>${tipo}:</b> <span>${info.dns[tipo].join(', ')}</span></li>`;
  });
  html += '</ul></div>';
  // WHOIS
  html += `<div class='mb-3'><h5>${icono('id-card','teal')}WHOIS</h5>`;
  if (info.whois && !info.whois.error) {
    html += '<ul>';
    Object.entries(info.whois).forEach(([k,v])=>{
      if(typeof v === 'string' && v.length < 100) html += `<li><b>${k}:</b> ${v}</li>`;
    });
    html += '</ul>';
    // Detalles largos
    Object.entries(info.whois).forEach(([k,v])=>{
      if(typeof v === 'string' && v.length >= 100) html += `<div class='mb-2'><b>${k}:</b><pre style='color:#00ffae; background:none;white-space:pre-wrap;'>${v}</pre></div>`;
    });
  } else {
    html += `<span class='text-danger'>No disponible</span>`;
  }
  html += '</div>';
  // Geolocalización
  html += `<div class='mb-3'><h5>${icono('map-marker-alt','green')}Geolocalización</h5>`;
  if (info.geo && (info.geo['ip-api'] || info.geo['ipwhois'] || info.geo['ipinfo'])) {
    ['ip-api','ipwhois','ipinfo'].forEach(src=>{
      if(info.geo[src]){
        html += `<div><b>${src}:</b><ul>`;
        Object.entries(info.geo[src]).forEach(([k,v])=>{
          if(typeof v === 'string' || typeof v === 'number') html += `<li><b>${k}:</b> ${v}</li>`;
        });
        html += '</ul></div>';
      }
    });
  } else {
    html += '<span class="text-warning">No disponible</span>';
  }
  html += '</div>';
  // Ping
  html += `<div class='mb-3'><h5>${icono('stopwatch','gold')}Ping</h5>${info.ping && info.ping.ms ? `<b>${info.ping.ms} ms</b>` : '<span class="text-danger">Sin respuesta</span>'}</div>`;
  // Puertos
  html += `<div class='mb-3'><h5>${icono('ethernet','gray')}Puertos comunes</h5><table class='table table-sm table-bordered w-auto'><thead><tr><th>Puerto</th><th>Estado</th></tr></thead><tbody>`;
  if (info.puertos) {
    Object.entries(info.puertos).forEach(([p,estado])=>{
      html += `<tr><td>${p}</td><td class='${estado==='abierto'?'text-success':(estado==='cerrado'?'text-danger':'text-warning')}'>${estado}</td></tr>`;
    });
  }
  html += '</tbody></table></div>';
  // Cabeceras
  html += `<div class='mb-3'><h5>${icono('bars','#00ffae')}Cabeceras HTTP</h5><div class='table-responsive'><table class='table table-sm table-bordered w-auto'><thead><tr><th>Cabecera</th><th>Valor</th></tr></thead><tbody>`;
  if (info.cabeceras && Object.keys(info.cabeceras).length && !info.cabeceras.error) {
    Object.entries(info.cabeceras).forEach(([k,v])=>{
      html += `<tr><td>${k}</td><td>${v}</td></tr>`;
    });
  } else {
    html += `<tr><td colspan='2'><span class='text-warning'>No disponible</span></td></tr>`;
  }
  html += '</tbody></table></div></div>';
  // SSL
  html += `<div class='mb-3'><h5>${icono('lock','dodgerblue')}SSL</h5>` + renderSSLDetails(info.ssl) + '</div>';
  // Protección DDoS
  html += `<div class='mb-3'><h5>${icono('shield-halved','crimson')}Protección DDoS</h5><b>${info.proteccion || 'No detectada'}</b></div>`;
  // Enlaces útiles
  html += `<div class='mb-3'><h5>${icono('link','gray')}Enlaces útiles</h5>`;
  if (info.enlaces) {
    Object.entries(info.enlaces).forEach(([k,v])=>{
      if (v) html += `<div><a href='${v}' target='_blank' rel='noopener'><i class='fa-solid fa-arrow-up-right-from-square'></i> ${k}</a></div>`;
    });
  }
  html += '</div>';
  resultBox.innerHTML = html;
}

redForm.addEventListener('submit', async function(e) {
  e.preventDefault();
  const host = document.getElementById('host').value.trim();
  await analizarRed(host);
});

document.getElementById('resetBtn').addEventListener('click', function(){
  redForm.reset();
  resultBox.style.display = 'none';
});

exportBtn.addEventListener('click', function(){
  const host = document.getElementById('host').value.trim();
  analizarRed(host).then(info => {
    const blob = new Blob([JSON.stringify(info, null, 2)], {type:'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analisis_red_${info.identidad.dominio}.json`;
    a.click();
    URL.revokeObjectURL(url);
  });
}); 