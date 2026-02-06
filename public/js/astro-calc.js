// ======= ASTRO-CALC.JS v2 — Astro4 DUO (enriched) =======

// === OCCIDENTAL ===
const westernSigns = [
  { name:"Capricornio", element:"Tierra", modality:"Cardinal", start:[12,22], end:[1,19] },
  { name:"Acuario", element:"Aire", modality:"Fijo", start:[1,20], end:[2,18] },
  { name:"Piscis", element:"Agua", modality:"Mutable", start:[2,19], end:[3,20] },
  { name:"Aries", element:"Fuego", modality:"Cardinal", start:[3,21], end:[4,19] },
  { name:"Tauro", element:"Tierra", modality:"Fijo", start:[4,20], end:[5,20] },
  { name:"Géminis", element:"Aire", modality:"Mutable", start:[5,21], end:[6,20] },
  { name:"Cáncer", element:"Agua", modality:"Cardinal", start:[6,21], end:[7,22] },
  { name:"Leo", element:"Fuego", modality:"Fijo", start:[7,23], end:[8,22] },
  { name:"Virgo", element:"Tierra", modality:"Mutable", start:[8,23], end:[9,22] },
  { name:"Libra", element:"Aire", modality:"Cardinal", start:[9,23], end:[10,22] },
  { name:"Escorpio", element:"Agua", modality:"Fijo", start:[10,23], end:[11,21] },
  { name:"Sagitario", element:"Fuego", modality:"Mutable", start:[11,22], end:[12,21] }
];

function getWesternSign(birthDate) {
  const day = birthDate.getDate(), month = birthDate.getMonth()+1;
  for (const sign of westernSigns) {
    const [sm,sd]=sign.start, [em,ed]=sign.end;
    if (sm===12&&em===1) { if ((month===12&&day>=sd)||(month===1&&day<=ed)) return sign; }
    else { if ((month===sm&&day>=sd)||(month===em&&day<=ed)) return sign; }
  }
  return westernSigns[0];
}

// === CHINO (con Yin/Yang) ===
const CHINESE_NEW_YEAR = {
  1920:'1920-02-20',1921:'1921-02-08',1922:'1922-01-28',1923:'1923-02-16',
  1924:'1924-02-05',1925:'1925-01-24',1926:'1926-02-13',1927:'1927-02-02',
  1928:'1928-01-23',1929:'1929-02-10',1930:'1930-01-30',1931:'1931-02-17',
  1932:'1932-02-06',1933:'1933-01-26',1934:'1934-02-14',1935:'1935-02-04',
  1936:'1936-01-24',1937:'1937-02-11',1938:'1938-01-31',1939:'1939-02-19',
  1940:'1940-02-08',1941:'1941-01-27',1942:'1942-02-15',1943:'1943-02-05',
  1944:'1944-01-25',1945:'1945-02-13',1946:'1946-02-02',1947:'1947-01-22',
  1948:'1948-02-10',1949:'1949-01-29',1950:'1950-02-17',1951:'1951-02-06',
  1952:'1952-01-27',1953:'1953-02-14',1954:'1954-02-03',1955:'1955-01-24',
  1956:'1956-02-12',1957:'1957-01-31',1958:'1958-02-18',1959:'1959-02-08',
  1960:'1960-01-28',1961:'1961-02-15',1962:'1962-02-05',1963:'1963-01-25',
  1964:'1964-02-13',1965:'1965-02-02',1966:'1966-01-21',1967:'1967-02-09',
  1968:'1968-01-30',1969:'1969-02-17',1970:'1970-02-06',1971:'1971-01-27',
  1972:'1972-02-15',1973:'1973-02-03',1974:'1974-01-23',1975:'1975-02-11',
  1976:'1976-01-31',1977:'1977-02-18',1978:'1978-02-07',1979:'1979-01-28',
  1980:'1980-02-16',1981:'1981-02-05',1982:'1982-01-25',1983:'1983-02-13',
  1984:'1984-02-02',1985:'1985-02-20',1986:'1986-02-09',1987:'1987-01-29',
  1988:'1988-02-17',1989:'1989-02-06',1990:'1990-01-27',1991:'1991-02-15',
  1992:'1992-02-04',1993:'1993-01-23',1994:'1994-02-10',1995:'1995-01-31',
  1996:'1996-02-19',1997:'1997-02-07',1998:'1998-01-28',1999:'1999-02-16',
  2000:'2000-02-05',2001:'2001-01-24',2002:'2002-02-12',2003:'2003-02-01',
  2004:'2004-01-22',2005:'2005-02-09',2006:'2006-01-29',2007:'2007-02-18',
  2008:'2008-02-07',2009:'2009-01-26',2010:'2010-02-14',2011:'2011-02-03',
  2012:'2012-01-23',2013:'2013-02-10',2014:'2014-01-31',2015:'2015-02-19',
  2016:'2016-02-08',2017:'2017-01-28',2018:'2018-02-16',2019:'2019-02-05',
  2020:'2020-01-25',2021:'2021-02-12',2022:'2022-02-01',2023:'2023-01-22',
  2024:'2024-02-10',2025:'2025-01-29',2026:'2026-02-17',2027:'2027-02-06',
  2028:'2028-01-26',2029:'2029-02-13',2030:'2030-02-03'
};

function getChineseYear(birthDate) {
  const year = birthDate.getFullYear();
  if (!CHINESE_NEW_YEAR[year]) return year;
  return birthDate < new Date(CHINESE_NEW_YEAR[year]) ? year-1 : year;
}

const chineseAnimals = ["Rata","Buey","Tigre","Conejo","Dragón","Serpiente","Caballo","Cabra","Mono","Gallo","Perro","Cerdo"];
const chineseElements = ["Madera","Fuego","Tierra","Metal","Agua"];

function getChineseZodiac(birthDate) {
  const cy = getChineseYear(birthDate);
  const idx = (cy-4)%12;
  const elemIdx = Math.floor(((cy-4)%10)/2);
  const yinYang = cy%2===0 ? "Yang" : "Yin";
  return { animal: chineseAnimals[idx], element: chineseElements[elemIdx], yinYang, year: cy };
}

// === VÉDICO (con deity, quality, pada, astronomy-engine) ===
const NAKSHATRAS = [
  { name:"Ashwini", deity:"Ashwini Kumaras", quality:"veloz, sanador" },
  { name:"Bharani", deity:"Yama", quality:"restricción, transformación" },
  { name:"Krittika", deity:"Agni", quality:"agudo, purificador" },
  { name:"Rohini", deity:"Brahma", quality:"crecimiento, creatividad" },
  { name:"Mrigashira", deity:"Soma", quality:"buscador, curioso" },
  { name:"Ardra", deity:"Rudra", quality:"tormenta, transformación" },
  { name:"Punarvasu", deity:"Aditi", quality:"renovación, retorno" },
  { name:"Pushya", deity:"Brihaspati", quality:"nutritivo, próspero" },
  { name:"Ashlesha", deity:"Nagas", quality:"místico, intenso" },
  { name:"Magha", deity:"Pitris", quality:"real, ancestral" },
  { name:"Purva Phalguni", deity:"Bhaga", quality:"placer, creatividad" },
  { name:"Uttara Phalguni", deity:"Aryaman", quality:"amistad, contratos" },
  { name:"Hasta", deity:"Savitar", quality:"habilidad, artesanía" },
  { name:"Chitra", deity:"Tvashtar", quality:"brillante, artístico" },
  { name:"Swati", deity:"Vayu", quality:"independiente, flexible" },
  { name:"Vishakha", deity:"Indra-Agni", quality:"determinado, enfocado" },
  { name:"Anuradha", deity:"Mitra", quality:"devoción, amistad" },
  { name:"Jyeshtha", deity:"Indra", quality:"protector, mayor" },
  { name:"Mula", deity:"Nirriti", quality:"fundacional, investigador" },
  { name:"Purva Ashadha", deity:"Apas", quality:"invencible, purificador" },
  { name:"Uttara Ashadha", deity:"Vishvadevas", quality:"universal, victorioso" },
  { name:"Shravana", deity:"Vishnu", quality:"aprendizaje, escucha" },
  { name:"Dhanishta", deity:"Vasus", quality:"riqueza, musical" },
  { name:"Shatabhisha", deity:"Varuna", quality:"sanador, secreto" },
  { name:"Purva Bhadrapada", deity:"Aja Ekapada", quality:"fogoso, transformativo" },
  { name:"Uttara Bhadrapada", deity:"Ahir Budhnya", quality:"profundo, espiritual" },
  { name:"Revati", deity:"Pushan", quality:"nutritivo, viajero" }
];

const nakshatraGroups = [
  "Deva","Manushya","Rakshasa","Deva","Deva","Manushya",
  "Deva","Deva","Rakshasa","Rakshasa","Manushya","Manushya",
  "Deva","Rakshasa","Deva","Rakshasa","Deva","Rakshasa",
  "Rakshasa","Manushya","Manushya","Deva","Rakshasa",
  "Rakshasa","Manushya","Manushya","Deva"
];

function calculateMoonLong(dt) {
  // Try astronomy-engine first
  if (typeof Astronomy !== 'undefined') {
    try {
      const astroDate = Astronomy.MakeTime(dt);
      const moonEcl = Astronomy.EclipticGeoMoon(astroDate);
      const tropicalLong = moonEcl.elon;
      const year = dt.getFullYear();
      const ayanamsa = 23.85 + (year - 2000) * 0.0139;
      return { long: (tropicalLong - ayanamsa + 360) % 360, precision: 'alta' };
    } catch(e) { /* fallback */ }
  }
  // Fallback
  const SIDEREAL_MONTH = 27.321661;
  const MOON_DAILY = 360 / SIDEREAL_MONTH;
  const REF_DATE = new Date(Date.UTC(2000, 0, 21, 4, 40, 0));
  const REF_MOON_LONG = 121;
  const daysDiff = (dt.getTime() - REF_DATE.getTime()) / 86400000;
  let moonLong = (REF_MOON_LONG + daysDiff * MOON_DAILY) % 360;
  if (moonLong < 0) moonLong += 360;
  return { long: moonLong, precision: 'aproximada' };
}

function getNakshatraFull(birthDate) {
  const dt = new Date(birthDate);
  const { long: moonLong, precision } = calculateMoonLong(dt);
  const SPAN = 360/27;
  const idx = Math.floor(moonLong / SPAN) % 27;
  const pada = Math.floor((moonLong % SPAN) / (SPAN / 4)) + 1;
  const nak = NAKSHATRAS[idx];
  return {
    name: nak.name,
    deity: nak.deity,
    quality: nak.quality,
    group: nakshatraGroups[idx],
    pada,
    index: idx,
    precision
  };
}

// Backward compat alias
function getNakshatraSimple(birthDate) {
  return getNakshatraFull(birthDate);
}

// === NUMEROLOGÍA (con Soul y Destiny) ===
const numKeywords = {
  1:'Liderazgo',2:'Cooperación',3:'Expresión',4:'Estabilidad',5:'Libertad',
  6:'Responsabilidad',7:'Sabiduría',8:'Poder',9:'Humanitarismo',
  11:'Maestro Espiritual',22:'Maestro Constructor',33:'Maestro Sanador'
};

function reduceToSingle(n) {
  while (n > 9 && n !== 11 && n !== 22 && n !== 33) {
    let s = 0;
    for (const ch of String(n)) s += parseInt(ch);
    n = s;
  }
  return n;
}

function getLifePath(birthDate) {
  const str = birthDate.toISOString().split('T')[0].replace(/-/g,'');
  let sum = 0;
  for (const ch of str) sum += parseInt(ch);
  return reduceToSingle(sum);
}

const letterValues = {
  a:1,b:2,c:3,d:4,e:5,f:6,g:7,h:8,i:9,
  j:1,k:2,l:3,m:4,n:5,o:6,p:7,q:8,r:9,
  s:1,t:2,u:3,v:4,w:5,x:6,y:7,z:8
};
const vowels = ['a','e','i','o','u'];

function getSoulNumber(fullName) {
  if (!fullName) return null;
  const name = fullName.toLowerCase().replace(/[^a-záéíóúñü]/g,'');
  let sum = 0;
  for (const ch of name) { if (vowels.includes(ch)) sum += letterValues[ch]||0; }
  return reduceToSingle(sum);
}

function getDestinyNumber(fullName) {
  if (!fullName) return null;
  const name = fullName.toLowerCase().replace(/[^a-záéíóúñü]/g,'');
  let sum = 0;
  for (const ch of name) { sum += letterValues[ch]||0; }
  return reduceToSingle(sum);
}

function getKeyword(n) { return numKeywords[n] || ''; }
