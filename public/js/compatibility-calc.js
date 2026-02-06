// ======= COMPATIBILITY-CALC.JS =======

// === OCCIDENTAL ===
function westernCompat(sign1, sign2) {
  const elem1 = sign1.element, elem2 = sign2.element;
  const mod1 = sign1.modality, mod2 = sign2.modality;
  
  // Mismo signo
  if (sign1.name === sign2.name) return { score: 85, detail: `Ambos ${sign1.name} — se entienden profundamente` };
  
  // Mismo elemento
  if (elem1 === elem2) {
    let s = 90;
    let d = `Ambos ${elem1} — armonía natural`;
    if (mod1 === mod2) { s += 5; d += ', misma modalidad'; }
    return { score: Math.min(s, 95), detail: d };
  }
  
  // Complementarios
  const complementary = {
    'Fuego': 'Aire', 'Aire': 'Fuego',
    'Tierra': 'Agua', 'Agua': 'Tierra'
  };
  if (complementary[elem1] === elem2) {
    let s = 75;
    let d = `${elem1} + ${elem2} — se potencian mutuamente`;
    if (mod1 === mod2) s += 10;
    return { score: s, detail: d };
  }
  
  // Neutros (Fuego-Tierra, Aire-Agua)
  const neutral = {
    'Fuego': 'Tierra', 'Tierra': 'Fuego',
    'Aire': 'Agua', 'Agua': 'Aire'
  };
  if (neutral[elem1] === elem2) {
    return { score: 50, detail: `${elem1} + ${elem2} — requiere esfuerzo consciente` };
  }
  
  // Conflictivos (Fuego-Agua, Aire-Tierra)
  return { score: 30, detail: `${elem1} + ${elem2} — atracción de opuestos, desafiante` };
}

// === VÉDICO (Nakshatra Groups) ===
function vedicCompat(nak1, nak2) {
  const g1 = nak1.group, g2 = nak2.group;
  
  if (nak1.name === nak2.name) return { score: 95, detail: `Mismo nakshatra (${nak1.name}) — conexión kármica` };
  
  if (g1 === g2) {
    const labels = { 'Deva': 'divina', 'Manushya': 'humana', 'Rakshasa': 'intensa' };
    return { score: 70, detail: `Ambos grupo ${g1} — energía ${labels[g1]} compartida` };
  }
  
  // Deva + Manushya = OK
  if ((g1 === 'Deva' && g2 === 'Manushya') || (g1 === 'Manushya' && g2 === 'Deva')) {
    return { score: 60, detail: `${g1} + ${g2} — balance entre lo espiritual y lo terrenal` };
  }
  
  // Deva + Rakshasa or Manushya + Rakshasa = challenging
  if (g1 === 'Rakshasa' || g2 === 'Rakshasa') {
    return { score: 40, detail: `${g1} + ${g2} — transformación a través del desafío` };
  }
  
  return { score: 55, detail: `${nak1.name} + ${nak2.name}` };
}

// === CHINO ===
const CHINESE_TRIANGLES = [
  ['Rata','Dragón','Mono'],
  ['Buey','Serpiente','Gallo'],
  ['Tigre','Caballo','Perro'],
  ['Conejo','Cabra','Cerdo']
];

const CHINESE_COMPATIBLE = {
  'Rata':['Buey','Dragón','Mono'], 'Buey':['Rata','Serpiente','Gallo'],
  'Tigre':['Caballo','Perro','Cerdo'], 'Conejo':['Cabra','Cerdo','Perro'],
  'Dragón':['Rata','Mono','Gallo'], 'Serpiente':['Buey','Gallo','Dragón'],
  'Caballo':['Tigre','Cabra','Perro'], 'Cabra':['Conejo','Caballo','Cerdo'],
  'Mono':['Rata','Dragón','Serpiente'], 'Gallo':['Buey','Serpiente','Dragón'],
  'Perro':['Tigre','Conejo','Caballo'], 'Cerdo':['Conejo','Cabra','Tigre']
};

const CHINESE_OPPOSITES = {
  'Rata':'Caballo','Caballo':'Rata',
  'Buey':'Cabra','Cabra':'Buey',
  'Tigre':'Mono','Mono':'Tigre',
  'Conejo':'Gallo','Gallo':'Conejo',
  'Dragón':'Perro','Perro':'Dragón',
  'Serpiente':'Cerdo','Cerdo':'Serpiente'
};

const ELEM_GENERATE = {
  'Madera':'Fuego','Fuego':'Tierra','Tierra':'Metal','Metal':'Agua','Agua':'Madera'
};
const ELEM_DESTROY = {
  'Madera':'Tierra','Tierra':'Agua','Agua':'Fuego','Fuego':'Metal','Metal':'Madera'
};

function chineseCompat(z1, z2) {
  const a1 = z1.animal, a2 = z2.animal;
  const e1 = z1.element, e2 = z2.element;
  let score = 50;
  let detail = '';
  
  // Mismo animal
  if (a1 === a2) {
    score = 70;
    detail = `Ambos ${a1} — se entienden pero compiten`;
  }
  // Triángulo de afinidad
  else if (CHINESE_TRIANGLES.some(t => t.includes(a1) && t.includes(a2))) {
    score = 95;
    detail = `${a1} + ${a2} — triángulo de afinidad perfecta`;
  }
  // Compatible
  else if (CHINESE_COMPATIBLE[a1] && CHINESE_COMPATIBLE[a1].includes(a2)) {
    score = 75;
    detail = `${a1} + ${a2} — naturalmente compatibles`;
  }
  // Opuestos
  else if (CHINESE_OPPOSITES[a1] === a2) {
    score = 30;
    detail = `${a1} + ${a2} — opuestos en el zodiaco`;
  }
  // Neutro
  else {
    score = 50;
    detail = `${a1} + ${a2} — relación neutral`;
  }
  
  // Bonus/penalty por elementos
  if (e1 === e2) score += 10;
  else if (ELEM_GENERATE[e1] === e2 || ELEM_GENERATE[e2] === e1) score += 5;
  else if (ELEM_DESTROY[e1] === e2 || ELEM_DESTROY[e2] === e1) score -= 10;
  
  return { score: Math.max(10, Math.min(100, score)), detail: detail + ` (${e1}/${e2})` };
}

// === NUMEROLOGÍA ===
const NUMEROLOGY_COMPLEMENTARY = [[1,9],[2,8],[3,7],[4,6],[5,5]];
const NUMEROLOGY_HARMONIC = [[1,5,7],[2,4,8],[3,6,9]];

function numerologyCompat(lp1, lp2) {
  if (lp1 === lp2) return { score: 85, detail: `Ambos camino de vida ${lp1} — espejo energético` };
  
  for (const pair of NUMEROLOGY_COMPLEMENTARY) {
    if ((pair[0]===lp1 && pair[1]===lp2) || (pair[0]===lp2 && pair[1]===lp1)) {
      return { score: 90, detail: `${lp1} + ${lp2} — números complementarios perfectos` };
    }
  }
  
  for (const group of NUMEROLOGY_HARMONIC) {
    if (group.includes(lp1) && group.includes(lp2)) {
      return { score: 75, detail: `${lp1} + ${lp2} — vibración armónica compartida` };
    }
  }
  
  return { score: 50, detail: `Caminos ${lp1} + ${lp2} — energías diferentes, aprendizaje mutuo` };
}

// === SCORE GENERAL ===
function calculateFullCompatibility(date1, date2) {
  const d1 = new Date(date1 + 'T12:00:00');
  const d2 = new Date(date2 + 'T12:00:00');
  
  const w1 = getWesternSign(d1), w2 = getWesternSign(d2);
  const c1 = getChineseZodiac(d1), c2 = getChineseZodiac(d2);
  const n1 = getNakshatraSimple(d1), n2 = getNakshatraSimple(d2);
  const lp1 = getLifePath(d1), lp2 = getLifePath(d2);
  
  const western = westernCompat(w1, w2);
  const vedic = vedicCompat(n1, n2);
  const chinese = chineseCompat(c1, c2);
  const numerology = numerologyCompat(lp1, lp2);
  
  const total = Math.round((western.score + vedic.score + chinese.score + numerology.score) / 4);
  
  // Label
  let label = '';
  if (total >= 85) label = '¡Conexión extraordinaria!';
  else if (total >= 70) label = 'Alta compatibilidad';
  else if (total >= 55) label = 'Buenos complementos';
  else if (total >= 40) label = 'Desafío con potencial';
  else label = 'Caminos diferentes';
  
  // Insight
  const best = [
    { name: 'occidental', score: western.score },
    { name: 'védica', score: vedic.score },
    { name: 'china', score: chinese.score },
    { name: 'numerológica', score: numerology.score }
  ].sort((a, b) => b.score - a.score);
  
  const insight = `Su conexión más fuerte está en la tradición ${best[0].name} (${best[0].score}%). ` +
    `Su mayor reto se encuentra en la ${best[3].name} (${best[3].score}%), ` +
    `lo cual invita a crecer juntos en esa dimensión.`;
  
  return {
    total, label, insight,
    western: { ...western, signs: `${w1.name} + ${w2.name}` },
    vedic: { ...vedic, signs: `${n1.name} + ${n2.name}` },
    chinese: { ...chinese, signs: `${c1.animal} + ${c2.animal}` },
    numerology: { ...numerology, signs: `${lp1} + ${lp2}` },
    profiles: { w1, w2, c1, c2, n1, n2, lp1, lp2 }
  };
}
