// ======= APP.JS v2 — Astro4 DUO =======

let lastResult = null;

function calculateCompatibility() {
  const name1 = document.getElementById('name1').value.trim();
  const name2 = document.getElementById('name2').value.trim();
  const date1 = document.getElementById('date1').value;
  const date2 = document.getElementById('date2').value;

  if (!name1 || !name2 || !date1 || !date2) {
    alert('Por favor completa todos los campos');
    return;
  }

  // Micro-delay for anticipation
  const btn = document.getElementById('btn-reveal');
  btn.textContent = '✨ Calculando...';
  btn.disabled = true;

  setTimeout(() => {
    const result = calculateFullCompatibility(date1, date2);
    lastResult = { ...result, name1, name2 };
    showResult(result, name1, name2);
    btn.textContent = '✨ Revelar compatibilidad';
    btn.disabled = false;
  }, 400);
}

function showResult(result, name1, name2) {
  document.getElementById('screen-input').style.display = 'none';
  document.getElementById('screen-result').style.display = 'block';
  document.getElementById('result-names').textContent = `${name1} 💕 ${name2}`;

  // Score circle animation
  const pct = result.total;
  const ring = document.getElementById('score-ring-fill');
  const circumference = 2 * Math.PI * 85;
  const offset = circumference - (pct / 100) * circumference;
  
  let color = '#ef4444';
  if (pct >= 80) color = '#ffd700';
  else if (pct >= 60) color = '#60a5fa';
  else if (pct >= 40) color = '#f59e0b';
  
  ring.style.stroke = color;
  setTimeout(() => { ring.style.strokeDashoffset = offset; }, 100);

  animateNumber('score-number', 0, pct, 1200);
  document.getElementById('score-label').textContent = result.label;

  // Breakdown bars
  const traditions = ['western', 'vedic', 'chinese', 'numerology'];
  traditions.forEach((t, i) => {
    const data = result[t];
    document.getElementById(`pct-${t}`).textContent = `${data.score}%`;
    document.getElementById(`detail-${t}`).textContent = `${data.signs} — ${data.detail}`;
    setTimeout(() => {
      document.getElementById(`fill-${t}`).style.width = `${data.score}%`;
    }, 300 + i * 200);
  });

  // Vedic disclaimer
  if (result.vedicNote) {
    const vedicDetail = document.getElementById('detail-vedic');
    vedicDetail.textContent += ` ${result.vedicNote}`;
  }

  // Insight
  document.getElementById('insight-card').style.display = 'block';
  document.getElementById('insight-text').textContent = result.insight;

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function animateNumber(id, from, to, duration) {
  const el = document.getElementById(id);
  const start = performance.now();
  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = `${Math.round(from + (to - from) * eased)}%`;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function resetForm() {
  document.getElementById('screen-result').style.display = 'none';
  document.getElementById('screen-input').style.display = 'block';
  document.getElementById('score-ring-fill').style.strokeDashoffset = '534';
  ['western','vedic','chinese','numerology'].forEach(t => {
    document.getElementById(`fill-${t}`).style.width = '0%';
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function shareResult() {
  if (!lastResult) return;
  
  const text = `✨ Astro4 DUO — Compatibilidad Cósmica\n\n` +
    `${lastResult.name1} 💕 ${lastResult.name2}\n` +
    `Score: ${lastResult.total}% — ${lastResult.label}\n\n` +
    `☀️ Occidental: ${lastResult.western.score}%\n` +
    `🪷 Védico: ${lastResult.vedic.score}%\n` +
    `🐉 Chino: ${lastResult.chinese.score}%\n` +
    `🔢 Numerología: ${lastResult.numerology.score}%\n\n` +
    `Descubre tu compatibilidad: ${window.location.origin}`;

  if (navigator.share) {
    try {
      await navigator.share({ title: 'Astro4 DUO — Compatibilidad Cósmica', text });
    } catch (e) {
      fallbackCopy(text);
    }
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text) {
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.querySelector('.action-buttons .btn-primary');
    const orig = btn.textContent;
    btn.textContent = '✅ Copiado al portapapeles';
    setTimeout(() => btn.textContent = orig, 2000);
  }).catch(() => {
    // Final fallback
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    const btn = document.querySelector('.action-buttons .btn-primary');
    btn.textContent = '✅ Copiado';
    setTimeout(() => btn.textContent = '📤 Compartir resultado', 2000);
  });
}
