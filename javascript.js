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

function generateSCP(selectedClass, tone) {
  const styles = {
    clinical: 'Documentation follows standard Foundation protocol.',
    horror: 'Personnel describe overwhelming dread during exposure.',
    disturbing: 'Multiple staff resigned after the incident.',
    classified: 'This section is restricted by O5 Command.'
  };

  return `
Item #: SCP-${Math.floor(100 + Math.random() * 900)}
Object Class: ${selectedClass || random(classes)}

Description:
${styles[tone]}

Further details have been redacted.
`;
}

const tone = document.getElementById('toneSelect').value;
document.getElementById('output').textContent = generateSCP(selectedClass, tone);

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

document.getElementById('nativeAd').classList.remove('hidden');

const getText = () =>
  document.getElementById('output').textContent;

document.getElementById('copyBtn').onclick = () => {
  navigator.clipboard.writeText(getText());
  alert('Copied!');
};

document.getElementById('shareX').onclick = () => {
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(getText())}`;
  window.open(url, '_blank');
};

document.getElementById('shareReddit').onclick = () => {
  const url = `https://www.reddit.com/submit?title=Generated SCP&text=${encodeURIComponent(getText())}`;
  window.open(url, '_blank');
};

document.getElementById('shareActions').classList.remove('hidden');
