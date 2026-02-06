// ======= COMPATIBILITY-CALC.JS v4 — with birth time =======

// === OCCIDENTAL ===
function westernCompat(sign1, sign2) {
  const elem1=sign1.element, elem2=sign2.element, mod1=sign1.modality, mod2=sign2.modality;
  if (sign1.name===sign2.name) return {score:85, detail:`Ambos ${sign1.name} — se entienden profundamente`};
  if (elem1===elem2) {
    let s=90, d=`Ambos ${elem1} — armonía natural`;
    if (mod1===mod2) { s+=5; d+=', misma modalidad'; }
    return {score:Math.min(s,95), detail:d};
  }
  const comp={'Fuego':'Aire','Aire':'Fuego','Tierra':'Agua','Agua':'Tierra'};
  if (comp[elem1]===elem2) { let s=75; if(mod1===mod2) s+=10; return {score:s, detail:`${elem1} + ${elem2} — se potencian mutuamente`}; }
  const neut={'Fuego':'Tierra','Tierra':'Fuego','Aire':'Agua','Agua':'Aire'};
  if (neut[elem1]===elem2) return {score:50, detail:`${elem1} + ${elem2} — requiere esfuerzo consciente`};
  return {score:30, detail:`${elem1} + ${elem2} — atracción de opuestos, desafiante`};
}

// === VÉDICO ===
function vedicCompat(nak1, nak2) {
  const g1=nak1.group, g2=nak2.group;
  let score, detail;
  
  if (nak1.name===nak2.name) {
    score=95; detail=`Mismo nakshatra (${nak1.name}) — conexión kármica`;
    if (nak1.pada===nak2.pada) { score=98; detail+=`, mismo pada ${nak1.pada}`; }
  } else if (g1===g2) {
    const labels={'Deva':'divina','Manushya':'humana','Rakshasa':'intensa'};
    score=70; detail=`Ambos grupo ${g1} — energía ${labels[g1]} compartida`;
  } else if ((g1==='Deva'&&g2==='Manushya')||(g1==='Manushya'&&g2==='Deva')) {
    score=60; detail=`${g1} + ${g2} — balance espiritual-terrenal`;
  } else if (g1==='Rakshasa'||g2==='Rakshasa') {
    score=40; detail=`${g1} + ${g2} — transformación por desafío`;
  } else { score=55; detail=`${nak1.name} + ${nak2.name}`; }

  const deityInfo = `${nak1.name} (${nak1.deity}, ${nak1.quality}) · ${nak2.name} (${nak2.deity}, ${nak2.quality})`;
  // Precision: use the lower of the two
  const precOrder = {'alta':3,'buena':2,'media':1,'aproximada':0};
  const p1 = precOrder[nak1.precision]||0, p2 = precOrder[nak2.precision]||0;
  const precision = Math.min(p1,p2) >= 2 ? 'alta' : (Math.min(p1,p2) >= 1 ? 'media' : 'aproximada');
  
  return { score, detail, deityInfo, precision };
}

// === CHINO ===
const CHINESE_TRIANGLES=[['Rata','Dragón','Mono'],['Buey','Serpiente','Gallo'],['Tigre','Caballo','Perro'],['Conejo','Cabra','Cerdo']];
const CHINESE_COMPATIBLE={'Rata':['Buey','Dragón','Mono'],'Buey':['Rata','Serpiente','Gallo'],'Tigre':['Caballo','Perro','Cerdo'],'Conejo':['Cabra','Cerdo','Perro'],'Dragón':['Rata','Mono','Gallo'],'Serpiente':['Buey','Gallo','Dragón'],'Caballo':['Tigre','Cabra','Perro'],'Cabra':['Conejo','Caballo','Cerdo'],'Mono':['Rata','Dragón','Serpiente'],'Gallo':['Buey','Serpiente','Dragón'],'Perro':['Tigre','Conejo','Caballo'],'Cerdo':['Conejo','Cabra','Tigre']};
const CHINESE_OPPOSITES={'Rata':'Caballo','Caballo':'Rata','Buey':'Cabra','Cabra':'Buey','Tigre':'Mono','Mono':'Tigre','Conejo':'Gallo','Gallo':'Conejo','Dragón':'Perro','Perro':'Dragón','Serpiente':'Cerdo','Cerdo':'Serpiente'};
const ELEM_GEN={'Madera':'Fuego','Fuego':'Tierra','Tierra':'Metal','Metal':'Agua','Agua':'Madera'};
const ELEM_DES={'Madera':'Tierra','Tierra':'Agua','Agua':'Fuego','Fuego':'Metal','Metal':'Madera'};

function chineseCompat(z1, z2) {
  const a1=z1.animal,a2=z2.animal,e1=z1.element,e2=z2.element;
  let score=50, detail='';
  if (a1===a2) { score=70; detail=`Ambos ${a1} — se entienden pero compiten`; }
  else if (CHINESE_TRIANGLES.some(t=>t.includes(a1)&&t.includes(a2))) { score=95; detail=`${a1} + ${a2} — triángulo de afinidad perfecta`; }
  else if (CHINESE_COMPATIBLE[a1]&&CHINESE_COMPATIBLE[a1].includes(a2)) { score=75; detail=`${a1} + ${a2} — naturalmente compatibles`; }
  else if (CHINESE_OPPOSITES[a1]===a2) { score=30; detail=`${a1} + ${a2} — opuestos en el zodiaco`; }
  else { score=50; detail=`${a1} + ${a2} — relación neutral`; }
  if (e1===e2) score+=10;
  else if (ELEM_GEN[e1]===e2||ELEM_GEN[e2]===e1) score+=5;
  else if (ELEM_DES[e1]===e2||ELEM_DES[e2]===e1) score-=10;
  const yy1=z1.yinYang, yy2=z2.yinYang;
  if (yy1===yy2) { score+=5; detail+=` · Ambos ${yy1}`; }
  else { detail+=` · ${yy1}/${yy2}`; }
  return { score:Math.max(10,Math.min(100,score)), detail:detail+` (${e1}/${e2})` };
}

// === NUMEROLOGÍA ===
const NUM_COMPLEMENTARY=[[1,9],[2,8],[3,7],[4,6],[5,5]];
const NUM_HARMONIC=[[1,5,7],[2,4,8],[3,6,9]];
const NUM_MASTER=[11,22,33];

function singleNumCompat(n1, n2) {
  if (n1===n2) return 85;
  const iM1=NUM_MASTER.includes(n1), iM2=NUM_MASTER.includes(n2);
  if (iM1&&iM2) return n1===n2?98:88;
  if (iM1||iM2) { const m=iM1?n1:n2,norm=iM1?n2:n1,base=Math.floor(m/10)+m%10; if(norm===base) return 92; return 70; }
  for (const p of NUM_COMPLEMENTARY) if((p[0]===n1&&p[1]===n2)||(p[0]===n2&&p[1]===n1)) return 90;
  for (const g of NUM_HARMONIC) if(g.includes(n1)&&g.includes(n2)) return 75;
  return 50;
}

function numerologyCompat(lp1, lp2, soul1, soul2, dest1, dest2) {
  const lpScore = singleNumCompat(lp1, lp2);
  const kw = (n) => getKeyword(n) ? ` (${getKeyword(n)})` : '';
  
  if (soul1!==null && soul2!==null && dest1!==null && dest2!==null) {
    const soulScore = singleNumCompat(soul1, soul2);
    const destScore = singleNumCompat(dest1, dest2);
    const weighted = Math.round(lpScore*0.5 + soulScore*0.3 + destScore*0.2);
    const detail = `Camino ${lp1}${kw(lp1)} + ${lp2}${kw(lp2)} · Alma ${soul1}${kw(soul1)} + ${soul2}${kw(soul2)} · Destino ${dest1}${kw(dest1)} + ${dest2}${kw(dest2)}`;
    return { score:weighted, detail, breakdown:{life:lpScore,soul:soulScore,destiny:destScore} };
  }
  
  let detail;
  if (lpScore>=90) detail=`${lp1}${kw(lp1)} + ${lp2}${kw(lp2)} — complementarios perfectos`;
  else if (lpScore>=85) detail=`Ambos camino ${lp1}${kw(lp1)} — espejo energético`;
  else if (lpScore>=75) detail=`${lp1}${kw(lp1)} + ${lp2}${kw(lp2)} — vibración armónica`;
  else if (lpScore>=70) detail=`${lp1}${kw(lp1)} + ${lp2}${kw(lp2)} — energía elevada`;
  else detail=`${lp1}${kw(lp1)} + ${lp2}${kw(lp2)} — aprendizaje mutuo`;
  return { score:lpScore, detail, breakdown:{life:lpScore} };
}

// === SCORE GENERAL (with birth times) ===
function calculateFullCompatibility(date1, date2, fullName1, fullName2, time1, time2) {
  const d1=new Date(date1+'T12:00:00'), d2=new Date(date2+'T12:00:00');
  
  const w1=getWesternSign(d1), w2=getWesternSign(d2);
  const c1=getChineseZodiac(d1), c2=getChineseZodiac(d2);
  const n1=getNakshatraFull(d1, time1||null), n2=getNakshatraFull(d2, time2||null);
  const lp1=getLifePath(d1), lp2=getLifePath(d2);
  const soul1=getSoulNumber(fullName1), soul2=getSoulNumber(fullName2);
  const dest1=getDestinyNumber(fullName1), dest2=getDestinyNumber(fullName2);
  
  const western=westernCompat(w1,w2);
  const vedic=vedicCompat(n1,n2);
  const chinese=chineseCompat(c1,c2);
  const numerology=numerologyCompat(lp1,lp2,soul1,soul2,dest1,dest2);
  
  const total=Math.round((western.score+vedic.score+chinese.score+numerology.score)/4);
  
  let label='';
  if (total>=85) label='¡Conexión extraordinaria!';
  else if (total>=70) label='Alta compatibilidad';
  else if (total>=55) label='Buenos complementos';
  else if (total>=40) label='Desafío con potencial';
  else label='Caminos diferentes';
  
  const best=[
    {name:'occidental',score:western.score},{name:'védica',score:vedic.score},
    {name:'china',score:chinese.score},{name:'numerológica',score:numerology.score}
  ].sort((a,b)=>b.score-a.score);
  
  const insight=`Su conexión más fuerte está en la tradición ${best[0].name} (${best[0].score}%). `+
    `Su mayor reto se encuentra en la ${best[3].name} (${best[3].score}%), `+
    `lo cual invita a crecer juntos en esa dimensión.`;
  
  return {
    total, label, insight,
    western:{...western, signs:`${w1.name} + ${w2.name}`},
    vedic:{...vedic, signs:`${n1.name} (pada ${n1.pada}) + ${n2.name} (pada ${n2.pada})`},
    chinese:{...chinese, signs:`${c1.animal} ${c1.yinYang} + ${c2.animal} ${c2.yinYang}`},
    numerology:{...numerology, signs:numerology.detail},
    hasNames:!!(fullName1&&fullName2),
    hasTimes:!!(time1||time2),
    profiles:{w1,w2,c1,c2,n1,n2,lp1,lp2,soul1,soul2,dest1,dest2}
  };
}
