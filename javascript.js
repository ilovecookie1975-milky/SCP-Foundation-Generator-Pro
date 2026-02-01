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

function generateSCP(selectedClass = null) {
  const number = Math.floor(100 + Math.random() * 900);
  const objectClass = selectedClass || random(classes);

  return `
Item #: SCP-${number}
Object Class: ${objectClass}

Special Containment Procedures:
SCP-${number} is to be contained in a reinforced containment chamber located at Site-██.
Access is restricted to Level-3 personnel and above. Any personnel reporting auditory
hallucinations, intrusive thoughts, or feelings of being observed while near SCP-${number}
must report immediately for psychological evaluation.

Description:
SCP-${number} appears as ${random(anomalies)}. Initial discovery reports indicate anomalous
behavior triggered by prolonged observation. Subjects exposed for more than █ minutes
report vivid nightmares and memory distortion.

Addendum ${number}-A:
Testing has been suspended following Incident-${number}-██, in which SCP-${number}
demonstrated adaptive behavior previously undocumented. Further research requires
approval from O5 Command.
`;
}

// Generate
document.getElementById('generateBtn').addEventListener('click', () => {
  const selectedClass = document.getElementById('classSelect').value || null;
  document.getElementById('output').textContent = generateSCP(selectedClass);
  document.getElementById('generateBtn').textContent = 'Generate Another SCP';
});


// ✅ COPY (with fallback)
document.getElementById('copyBtn').addEventListener('click', () => {
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
document.getElementById('shareBtn').addEventListener('click', () => {
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
