// ======= i18n.js — Lightweight ES/EN toggle =======

const translations = {
  es: {
    tagline: 'Compatibilidad Cósmica — 4 tradiciones',
    question: '¿Qué tan compatibles son?',
    person: 'Persona',
    name: 'Nombre',
    namePh: 'Ej: María',
    namePh2: 'Ej: Carlos',
    fullname: 'Nombre completo',
    fullnamePh: 'Ej: María López García',
    fullnamePh2: 'Ej: Carlos Ruiz Pérez',
    optional: '(opcional)',
    birthdate: 'Fecha de nacimiento',
    birthtime: 'Hora de nacimiento',
    hint: '💡 Nombre completo = numerología avanzada · Hora = nakshatra preciso',
    reveal: '✨ Revelar compatibilidad',
    calculating: '✨ Calculando...',
    fullProfile: '🔮 Ver perfil completo en Astro4',
    breakdown: 'Desglose por tradición',
    western: 'Occidental',
    vedic: 'Védico',
    chinese: 'Chino',
    numerology: 'Numerología',
    share: '📤 Compartir resultado',
    tryAnother: '🔄 Probar otra pareja',
    install: 'Instalar App',
    alertFill: 'Por favor completa nombre y fecha de nacimiento',
    alertError: 'Error al calcular. Intenta de nuevo.',
    copied: '✅ Copiado al portapapeles'
  },
  en: {
    tagline: 'Cosmic Compatibility — 4 traditions',
    question: 'How compatible are you?',
    person: 'Person',
    name: 'Name',
    namePh: 'E.g.: Maria',
    namePh2: 'E.g.: Carlos',
    fullname: 'Full name',
    fullnamePh: 'E.g.: Maria Lopez Garcia',
    fullnamePh2: 'E.g.: Carlos Ruiz Perez',
    optional: '(optional)',
    birthdate: 'Date of birth',
    birthtime: 'Time of birth',
    hint: '💡 Full name = advanced numerology · Time = precise nakshatra',
    reveal: '✨ Reveal compatibility',
    calculating: '✨ Calculating...',
    fullProfile: '🔮 See full Astro4 profile',
    breakdown: 'Breakdown by tradition',
    western: 'Western',
    vedic: 'Vedic',
    chinese: 'Chinese',
    numerology: 'Numerology',
    share: '📤 Share result',
    tryAnother: '🔄 Try another couple',
    install: 'Install App',
    alertFill: 'Please fill in name and date of birth',
    alertError: 'Error calculating. Try again.',
    copied: '✅ Copied to clipboard'
  }
};

let currentLang = localStorage.getItem('a4duo-lang') || 'es';

function t(key) {
  return translations[currentLang][key] || translations['es'][key] || key;
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[currentLang][key]) {
      el.textContent = translations[currentLang][key];
    }
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (translations[currentLang][key]) {
      el.placeholder = translations[currentLang][key];
    }
  });
  // Update toggle button
  document.getElementById('lang-flag').textContent = currentLang === 'es' ? '🇺🇸' : '🇲🇽';
  document.getElementById('lang-label').textContent = currentLang === 'es' ? 'EN' : 'ES';
  // Update html lang
  document.documentElement.lang = currentLang;
}

function toggleLang() {
  currentLang = currentLang === 'es' ? 'en' : 'es';
  localStorage.setItem('a4duo-lang', currentLang);
  applyTranslations();
}

// Auto-detect language on first visit
if (!localStorage.getItem('a4duo-lang')) {
  const browserLang = navigator.language || navigator.userLanguage || 'es';
  currentLang = browserLang.startsWith('en') ? 'en' : 'es';
  localStorage.setItem('a4duo-lang', currentLang);
}

// Apply on load
document.addEventListener('DOMContentLoaded', applyTranslations);
