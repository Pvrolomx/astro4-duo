// ======= APP.JS v4.1 — with error handling =======

let lastResult = null;

function calculateCompatibility() {
  const name1 = document.getElementById('name1').value.trim();
  const name2 = document.getElementById('name2').value.trim();
  const date1 = document.getElementById('date1').value;
  const date2 = document.getElementById('date2').value;
  const fullname1 = document.getElementById('fullname1').value.trim() || null;
  const fullname2 = document.getElementById('fullname2').value.trim() || null;
  const time1 = document.getElementById('time1').value || null;
  const time2 = document.getElementById('time2').value || null;

  if (!name1 || !name2 || !date1 || !date2) {
    alert('Por favor completa nombre y fecha de nacimiento');
    return;
  }

  const btn = document.getElementById('btn-reveal');
  btn.textContent = '✨ Calculando...';
  btn.disabled = true;

  setTimeout(() => {
    try {
      const result = calculateFullCompatibility(date1, date2, fullname1, fullname2, time1, time2);
      lastResult = { ...result, name1, name2 };
      showResult(result, name1, name2);
    } catch(err) {
      console.error('Error calculating:', err);
      alert('Error al calcular. Intenta de nuevo.');
    }
    btn.textContent = '✨ Revelar compatibilidad';
    btn.disabled = false;
  }, 400);
}

function showResult(result, name1, name2) {
  document.getElementById('screen-input').style.display = 'none';
  document.getElementById('screen-result').style.display = 'block';
  document.getElementById('result-names').textContent = `${name1} 💕 ${name2}`;

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

  const traditions = ['western', 'vedic', 'chinese', 'numerology'];
  traditions.forEach((t, i) => {
    const data = result[t];
    document.getElementById(`pct-${t}`).textContent = `${data.score}%`;
    document.getElementById(`detail-${t}`).textContent = `${data.signs} — ${data.detail || ''}`;
    setTimeout(() => {
      document.getElementById(`fill-${t}`).style.width = `${data.score}%`;
    }, 300 + i * 200);
  });

  // Vedic extra
  const extraVedic = document.getElementById('extra-vedic');
  if (result.vedic && result.vedic.deityInfo) {
    extraVedic.textContent = result.vedic.deityInfo;
    extraVedic.style.display = 'block';
  } else { extraVedic.style.display = 'none'; }

  // Vedic precision badge
  const precBadge = document.getElementById('precision-vedic');
  if (result.vedic && result.vedic.precision) {
    const icons = { 'alta':'🟢 Alta precisión', 'buena':'🟢 Buena precisión', 'media':'🟡 Precisión media', 'aproximada':'🟡 Aproximado (sin hora)' };
    precBadge.textContent = icons[result.vedic.precision] || '';
    precBadge.style.display = 'block';
  } else { precBadge.style.display = 'none'; }

  // Insight
  document.getElementById('insight-card').style.display = 'block';
  let insightText = result.insight;
  if (result.hasNames && result.numerology && result.numerology.breakdown && result.numerology.breakdown.soul !== undefined) {
    const b = result.numerology.breakdown;
    insightText += ` Numerología avanzada: Camino ${b.life}%, Alma ${b.soul}%, Destino ${b.destiny}%.`;
  }
  if (result.hasTimes) {
    insightText += ` Nakshatra calculado con hora de nacimiento para mayor precisión.`;
  }
  document.getElementById('insight-text').textContent = insightText;
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
  const r = lastResult;
  const text = `✨ Astro4 DUO — Compatibilidad Cósmica\n\n${r.name1} 💕 ${r.name2}\nScore: ${r.total}% — ${r.label}\n\n☀️ Occidental: ${r.western.score}%\n🪷 Védico: ${r.vedic.score}%\n🐉 Chino: ${r.chinese.score}%\n🔢 Numerología: ${r.numerology.score}%\n\nDescubre tu compatibilidad: ${window.location.origin}`;
  if (navigator.share) {
    try { await navigator.share({title:'Astro4 DUO',text}); } catch(e) { fallbackCopy(text); }
  } else { fallbackCopy(text); }
}

function fallbackCopy(text) {
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.querySelector('.action-buttons .btn-primary');
    const o = btn.textContent;
    btn.textContent = '✅ Copiado al portapapeles';
    setTimeout(() => btn.textContent = o, 2000);
  }).catch(() => {
    const ta = document.createElement('textarea');
    ta.value=text; document.body.appendChild(ta); ta.select();
    document.execCommand('copy'); document.body.removeChild(ta);
    const btn = document.querySelector('.action-buttons .btn-primary');
    btn.textContent = '✅ Copiado';
    setTimeout(() => btn.textContent = '📤 Compartir resultado', 2000);
  });
}
