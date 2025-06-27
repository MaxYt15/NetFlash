// Generador de BINS Flashing-bins
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomMonth() {
  let m = Math.floor(Math.random() * 12) + 1;
  return m < 10 ? '0' + m : '' + m;
}
function randomYear() {
  return '' + (2025 + Math.floor(Math.random() * 9));
}
function randomCVV(tipo) {
  if (tipo === 'Amex') {
    return String(Math.floor(Math.random() * 9000) + 1000); // 4 dígitos
  } else {
    return String(Math.floor(Math.random() * 900) + 100); // 3 dígitos
  }
}
function randomBalance() {
  return randomInt(100, 5000);
}
function luhnCheck(num) {
  let arr = (num + '').split('').reverse().map(x => parseInt(x));
  let sum = arr.reduce((acc, val, idx) => acc + (idx % 2 ? ((val *= 2) > 9 ? val - 9 : val) : val), 0);
  return sum % 10 === 0;
}
function luhnGenerate(bin) {
  let number = bin;
  while (number.length < 15) number += Math.floor(Math.random() * 10);
  let sum = 0;
  for (let i = 0; i < 15; i++) {
    let digit = parseInt(number[i]);
    if (i % 2 === 0) digit *= 2;
    if (digit > 9) digit -= 9;
    sum += digit;
  }
  let checkDigit = (10 - (sum % 10)) % 10;
  return number + checkDigit;
}
function getCardType(bin) {
  if (/^4/.test(bin)) return 'Visa';
  if (/^5[1-5]/.test(bin)) return 'MasterCard';
  if (/^3[47]/.test(bin)) return 'Amex';
  if (/^6(?:011|5)/.test(bin)) return 'Discover';
  if (/^35/.test(bin)) return 'JCB';
  if (/^30[0-5]|^36|^38/.test(bin)) return 'Diners';
  if (/^62/.test(bin)) return 'UnionPay';
  if (/^50|^56|^57|^58|^6(?:022|4[4-9]|5)/.test(bin)) return 'Maestro';
  if (/^4011|^4312|^4389|^4514|^4576|^5041|^5066|^5067|^5090|^6277|^6362|^6363/.test(bin)) return 'Elo';
  if (/^606282|^3841/.test(bin)) return 'Hipercard';
  if (/^220[0-4]/.test(bin)) return 'Mir';
  if (/^9792/.test(bin)) return 'Troy';
  if (/^1/.test(bin)) return 'UATP';
  if (/^60/.test(bin)) return 'Rupay';
  if (/^5019/.test(bin)) return 'Dankort';
  if (/^5061|^6500|^6504|^6505/.test(bin)) return 'Verve';
  return 'Desconocida';
}
function getCardLength(bin) {
  if (/^3[47]/.test(bin)) return 15; // Amex
  if (/^5061|^6500|^6504|^6505/.test(bin)) return 19; // Verve
  if (/^62/.test(bin)) return 16; // UnionPay
  if (/^4/.test(bin)) return 16; // Visa
  if (/^5[1-5]/.test(bin)) return 16; // MasterCard
  if (/^6(?:011|5)/.test(bin)) return 16; // Discover
  if (/^35/.test(bin)) return 16; // JCB
  if (/^30[0-5]|^36|^38/.test(bin)) return 14; // Diners
  if (/^220[0-4]/.test(bin)) return 16; // Mir
  if (/^4011|^4312|^4389|^4514|^4576|^5041|^5066|^5067|^5090|^6277|^6362|^6363/.test(bin)) return 16; // Elo
  if (/^606282|^3841/.test(bin)) return 16; // Hipercard
  if (/^50|^56|^57|^58|^6(?:022|4[4-9]|5)/.test(bin)) return 16; // Maestro
  if (/^1/.test(bin)) return 15; // UATP
  if (/^60/.test(bin)) return 16; // Rupay
  if (/^5019/.test(bin)) return 16; // Dankort
  return 16;
}
function allDigitsEqual(str) {
  return /^([0-9])\1+$/.test(str);
}
function generateBINs(opts) {
  let bins = [];
  let generadas = new Set();
  let intentos = 0;
  let tipo = getCardType(opts.bin);
  for(let i=0;i<opts.cantidad;i++){
    let card = '';
    do {
      card = luhnGenerate(opts.bin);
      intentos++;
      if(intentos > 1000) break;
    } while (generadas.has(card) || allDigitsEqual(card));
    generadas.add(card);
    let mes = opts.mes && opts.mes !== 'Aleatorio' ? opts.mes : randomMonth();
    let anio = opts.anio && opts.anio !== 'Aleatorio' ? opts.anio.slice(-2) : randomYear().slice(-2);
    let cvv = '';
    if (opts.cvv) {
      let clean = opts.cvv.replace(/\D/g, '');
      let len = tipo === 'Amex' ? 4 : 3;
      if (clean.length >= len) {
        cvv = clean.slice(0, len);
      } else {
        cvv = clean;
        for (let j = clean.length; j < len; j++) {
          cvv += Math.floor(Math.random() * 10);
        }
      }
      if ((tipo === 'Amex' && cvv === '0000') || (tipo !== 'Amex' && cvv === '000')) {
        cvv = randomCVV(tipo);
      }
    } else {
      cvv = randomCVV(tipo);
    }
    if(opts.format==='PIPE'){
      bins.push(`${card}|${mes}|${anio}|${cvv}|${tipo}`);
    } else if(opts.format==='CSV'){
      bins.push(`${card},${mes},${anio},${cvv},${tipo}`);
    } else if(opts.format==='JSON'){
      bins.push(JSON.stringify({card, mes, "año": anio, cvv, tipo}));
    }
  }
  return bins;
}

document.getElementById('binForm').addEventListener('submit', function(e){
  e.preventDefault();
  const opts = {
    bin: document.getElementById('bin').value.trim(),
    format: document.getElementById('format').value,
    cantidad: parseInt(document.getElementById('cantidad').value),
    mes: document.getElementById('mes').value,
    anio: document.getElementById('anio').value.replace('20',''),
    cvv: document.getElementById('cvv').value.trim()
  };
  if(!opts.bin.match(/^\d{1,16}$/)){
    alert('El BIN debe tener entre 1 y 16 dígitos.');
    return;
  }
  const bins = generateBINs(opts);
  const tipoDetectado = getCardType(opts.bin);
  const resultBox = document.getElementById('resultBox');
  resultBox.style.display = 'block';
  if (opts.format === 'JSON') {
    let arr = bins.map(b => JSON.parse(b));
    resultBox.innerHTML = `<pre style='color:#00ffae; font-size:1rem; background:none; margin:0; padding:0;'>${JSON.stringify(arr, null, 2)}</pre>`;
  } else {
    resultBox.innerHTML = bins.map(b => {
      let tipo = tipoDetectado;
      let icon = window.cardIcons ? window.cardIcons[tipo] : '';
      let tipoClass = 'bin-type ' + tipo.toLowerCase();
      let binText = b.replace(/\|(Visa|MasterCard|Amex|Discover|JCB|Diners|UnionPay|Maestro|Elo|Hipercard|Mir|Troy|UATP|Rupay|Dankort|Verve|Desconocida)$/,'').replace(/,(Visa|MasterCard|Amex|Discover|JCB|Diners|UnionPay|Maestro|Elo|Hipercard|Mir|Troy|UATP|Rupay|Dankort|Verve|Desconocida)$/,'');
      return `<div class='fade-in-bin'>${binText}<span class='${tipoClass}'>${icon} ${tipo}</span></div>`;
    }).join('');
  }
  document.getElementById('copyBtn').style.display = 'inline-block';
});

document.getElementById('resetBtn').addEventListener('click', function(){
  document.getElementById('binForm').reset();
  document.getElementById('resultBox').style.display = 'none';
  document.getElementById('copyBtn').style.display = 'none';
});

document.getElementById('copyBtn').addEventListener('click', function(){
  const text = document.getElementById('resultBox').textContent;
  navigator.clipboard.writeText(text);
});

// Checker CC sin bins.json
document.getElementById('cc-checker-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const num = document.getElementById('cc-checker-input').value.replace(/\s+/g, '');
  const result = document.getElementById('cc-checker-result');
  if (!num.match(/^\d{12,20}$/)) {
    result.innerHTML = '<span class="text-danger">Por favor ingresa un número válido (12-20 dígitos).</span>';
    return;
  }
  const pan = num.slice(6, -1);
  const checksum = num.slice(-1);
  // Luhn check
  function luhnCheck(n) {
    let arr = (n + '').split('').reverse().map(x => parseInt(x));
    let sum = arr.reduce((acc, val, idx) => acc + (idx % 2 ? ((val *= 2) > 9 ? val - 9 : val) : val), 0);
    return sum % 10 === 0;
  }
  const isValid = luhnCheck(num);
  result.innerHTML = `
    <div class='bg-dark text-light rounded-3 p-3 mb-2'>
      <div class='mb-2'><span class='fw-bold'>Luhn Algorithm Check:</span> <span class='${isValid ? 'text-success' : 'text-danger'} fw-bold'>${isValid ? 'Válida <i class="fa-solid fa-circle-check"></i>' : 'Inválida <i class="fa-solid fa-circle-xmark"></i>'}</span></div>
      <div><span class='fw-bold'>PAN:</span> <span class='text-light'>${pan}</span></div>
      <div><span class='fw-bold'>Checksum:</span> <span class='text-danger'>${checksum}</span></div>
    </div>
  `;
}); 