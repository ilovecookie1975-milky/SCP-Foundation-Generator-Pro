let nativeAdLoaded = false;

function loadNativeAd() {
  const ad = document.getElementById('nativeAd');

  if (ad.dataset.loaded) return;

  ad.classList.remove('hidden'); // 👈 THIS WAS MISSING
  ad.dataset.loaded = 'true';

  const s = document.createElement('script');
  s.async = true;
  s.src = 'https://pl28625157.effectivegatecpm.com/e7154f6d16bd15375f544c59c8391510/invoke.js';

  ad.appendChild(s);
}


let adLoaded = false;

window.addEventListener('scroll', () => {
  if (adLoaded) return;
  adLoaded = true;
  loadNativeAd();
});

const classes = ['Safe', 'Euclid', 'Keter', 'Thaumiel'];

const anomalies = [
  'a sentient mirror that reflects events that have not yet occurred',
  'a humanoid entity that whispers the names of deceased personnel',
  'an abandoned train carriage that appears in random locations',
  'a child\'s drawing that alters reality when observed',
  'a biological mass capable of mimicking domestic animals'
];

const procedures = [
  'must be contained in a reinforced chamber with no reflective surfaces',
  'requires constant CCTV monitoring and weekly psychological evaluation',
  'is to be fed organic matter once every 48 hours',
  'must not be exposed to direct human contact',
  'requires approval from two Level-4 personnel for testing'
];

function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function maybe(section, chance = 0.5) {
  return Math.random() < chance ? section : '';
}

const intros = [
  "Initial containment reports describe an anomalous object of unclear origin.",
  "Early Foundation documentation notes irregular activity surrounding the entity.",
  "First-response teams reported unusual environmental readings upon discovery.",
  "Recovered field notes indicate an anomaly requiring immediate containment."
];

const effects = [
  "Subjects report persistent unease and difficulty concentrating.",
  "Extended exposure results in vivid dreams and memory fragmentation.",
  "Personnel have described auditory hallucinations with no identifiable source.",
  "Neurological scans show irregular patterns following interaction."
];

const discoveryLogs = [
  "SCP was discovered following civilian reports of unexplained disappearances.",
  "The anomaly was recovered from an abandoned structure during a routine sweep.",
  "Foundation assets intercepted local authorities before public exposure occurred.",
  "The object was located after an automated surveillance anomaly alert."
];

const incidentLogs = [
  "A containment breach occurred during routine testing, resulting in ██ injuries.",
  "Incident resulted in temporary loss of Site power and data corruption.",
  "Multiple personnel required amnestic treatment following exposure.",
  "Testing was suspended after SCP behavior escalated unexpectedly."
];

function generateSCP(selectedClass, tone) {
  const number = Math.floor(100 + Math.random() * 900);
  const objectClass = selectedClass || random(classes);

  let doc = `
Item #: SCP-${number}
Object Class: ${objectClass}

Special Containment Procedures:
SCP-${number} is housed at Site-██ under standard containment conditions.
Access is limited to authorized personnel only.
`;

  doc += `
Description:
${pick(intros)}
SCP-${number} appears as ${random(anomalies)}.
${pick(effects)}
`;

  doc += maybe(`
Discovery Log:
${pick(discoveryLogs)}
`, 0.7);

  if (objectClass === 'Keter') {
    doc += `
Incident Report:
${pick(incidentLogs)}
`;
  } else {
    doc += maybe(`
Addendum:
Further testing has been approved under controlled conditions.
`, 0.4);
  }

 doc += `
— End of File —
`;

  return doc;
}



// Generate
document.getElementById('generateBtn').addEventListener('click', () => {
  const selectedClass = document.getElementById('classSelect').value || null;
  const tone = document.getElementById('toneSelect').value;

  document.getElementById('output').textContent =
    generateSCP(selectedClass, tone);

  document.getElementById('generateBtn').textContent =
    'Generate Another SCP';

  // 🔥 load ad only after user intent
  // loadNativeAd();
});


// ✅ COPY (with fallback)
document.getElementById('copyBtnMain').addEventListener('click', () => {
  const text = document.getElementById('output').textContent;

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      alert('SCP copied to clipboard!');
    });
  } else {
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert('SCP copied to clipboard!');
  }
});

// ✅ SHARE (with fallback)
document.getElementById('copyBtnShare').addEventListener('click', () => {
  const text = document.getElementById('output').textContent;

  if (navigator.share) {
    navigator.share({
      title: 'SCP Foundation Generator',
      text: text,
      url: window.location.href
    });
  } else {
    alert('Sharing works on mobile devices. Link copied instead.');
    navigator.clipboard.writeText(window.location.href);
  }
});

const getText = () =>
  document.getElementById('output').textContent;

// document.getElementById('copyBtn').onclick = () => {
//   navigator.clipboard.writeText(getText());
//   alert('Copied!');
// };

// document.getElementById('shareX').onclick = () => {
//   const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(getText())}`;
//   window.open(url, '_blank');
// };

// document.getElementById('shareReddit').onclick = () => {
//   const url = `https://www.reddit.com/submit?title=Generated SCP&text=${encodeURIComponent(getText())}`;
//   window.open(url, '_blank');
// };

function safeShow(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('hidden');
}
