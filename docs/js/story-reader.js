// Text-to-speech functionality
let currentSpeech = null;

function readPageAloud(pageNum) {
    // Stop any current speech
    if (currentSpeech) {
        window.speechSynthesis.cancel();
    }

    // Get the text for the current page
    const pageElement = document.getElementById(`page-${pageNum}`);
    if (!pageElement) return;

    const textElement = pageElement.querySelector('.page-text');
    if (!textElement) return;

    const text = textElement.textContent;

    // Create speech synthesis utterance
    currentSpeech = new SpeechSynthesisUtterance(text);

    // Configure voice settings for child-friendly speech
    currentSpeech.rate = 0.85; // Slightly slower for children
    currentSpeech.pitch = 1.1; // Slightly higher pitch
    currentSpeech.volume = 1.0;

    // Try to select a friendly voice
    const voices = window.speechSynthesis.getVoices();
    const friendlyVoice = voices.find(voice =>
        voice.name.includes('Samantha') ||
        voice.name.includes('Victoria') ||
        voice.name.includes('Karen') ||
        voice.name.includes('Daniel') ||
        voice.lang.startsWith('en')
    );

    if (friendlyVoice) {
        currentSpeech.voice = friendlyVoice;
    }

    // Visual feedback while speaking
    const readButton = document.querySelector(`#page-${pageNum} .read-aloud-btn`);
    if (readButton) {
        readButton.classList.add('reading');
        readButton.innerHTML = '🔊 Reading...';
    }

    // Handle speech events
    currentSpeech.onend = () => {
        if (readButton) {
            readButton.classList.remove('reading');
            readButton.innerHTML = '🔊 Read to Me!';
        }
    };

    currentSpeech.onerror = () => {
        if (readButton) {
            readButton.classList.remove('reading');
            readButton.innerHTML = '🔊 Read to Me!';
        }
        console.error('Speech synthesis error');
    };

    // Start speaking
    window.speechSynthesis.speak(currentSpeech);
}

function stopReading() {
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
    }

    // Reset all read buttons
    document.querySelectorAll('.read-aloud-btn').forEach(btn => {
        btn.classList.remove('reading');
        btn.innerHTML = '🔊 Read to Me!';
    });
}

// Load voices when they're ready
if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = () => {
        const voices = window.speechSynthesis.getVoices();
        console.log('Available voices loaded:', voices.length);
    };
}

// Stop reading when changing pages
const originalShowPage = window.showPage;
window.showPage = function(pageNum) {
    stopReading();
    if (originalShowPage) {
        originalShowPage(pageNum);
    }
};

// Stop reading when leaving the page
window.addEventListener('beforeunload', stopReading);