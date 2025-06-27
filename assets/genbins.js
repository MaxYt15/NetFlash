// Generador de BINS Flashing-bins
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomMonth() {
  let m = randomInt(1,12);
  return m < 10 ? '0'+m : ''+m;
}
function randomYear() {
  return '' + randomInt(24, 30); // 2024-2030
}
function randomCVV() {
  return (''+randomInt(100,999));
}
function randomBalance() {
  return randomInt(100, 5000);
}
function luhnCheck(bin) {
  let arr = (bin + '').split('').map(x=>+x);
  for(let i=arr.length-2;i>=0;i-=2){
    arr[i]*=2;if(arr[i]>9)arr[i]-=9;
  }
  let sum = arr.reduce((a,b)=>a+b,0);
  return (10 - (sum%10))%10;
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
function generateBINs(opts) {
  let bins = [];
  for(let i=0;i<opts.cantidad;i++){
    let base = opts.bin.padEnd(15, '0').slice(0,15);
    let card = base + luhnCheck(base);
    let mes = opts.mes || randomMonth();
    let anio = opts.anio || randomYear();
    let cvv = opts.cvv || randomCVV();
    let divisa = opts.divisa;
    let balance = opts.balance || randomBalance();
    let tipo = getCardType(opts.bin);
    if(opts.format==='PIPE'){
      bins.push(`${card}|${mes}|${anio}|${cvv}|${divisa}|${balance}|${tipo}`);
    } else if(opts.format==='CSV'){
      bins.push(`${card},${mes},${anio},${cvv},${divisa},${balance},${tipo}`);
    } else if(opts.format==='JSON'){
      bins.push(JSON.stringify({card, mes, "año": anio, cvv, divisa, balance, tipo}));
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
    cvv: document.getElementById('cvv').value.trim(),
    divisa: document.getElementById('divisa').value,
    balance: document.getElementById('balance').value.trim()
  };
  if(!opts.bin.match(/^\d{6,16}$/)){
    alert('El BIN debe tener entre 6 y 16 dígitos.');
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