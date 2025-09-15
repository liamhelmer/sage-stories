// Character audio playback
let currentlyPlaying = null;
let currentCard = null;
let characterAudio = null;

function playCharacterAudio(characterId, element) {
    // Add wiggle animation
    element.classList.add('wiggle');
    setTimeout(() => {
        element.classList.remove('wiggle');
    }, 500);

    // Create audio element if it doesn't exist
    if (!characterAudio) {
        characterAudio = new Audio();
        characterAudio.preload = 'auto';
    }

    const audioPath = `audio/character-${characterId}.mp3`;

    // If the same character is clicked and audio is playing, pause it
    if (currentlyPlaying === characterId && !characterAudio.paused) {
        characterAudio.pause();
        if (currentCard) {
            currentCard.classList.remove('speaking');
        }
        currentlyPlaying = null;
        currentCard = null;
        return;
    }

    // Stop any currently playing audio
    if (!characterAudio.paused) {
        characterAudio.pause();
        if (currentCard) {
            currentCard.classList.remove('speaking');
        }
    }

    // Play the new audio
    characterAudio.src = audioPath;
    characterAudio.play().then(() => {
        currentlyPlaying = characterId;
        currentCard = element;
        element.classList.add('speaking');
    }).catch(error => {
        console.error('Error playing audio:', error);
    });

    // Remove speaking class when audio ends
    characterAudio.onended = () => {
        element.classList.remove('speaking');
        currentlyPlaying = null;
        currentCard = null;
    };
}

// Character wiggle animation (legacy function kept for compatibility)
function wiggle(element) {
    element.classList.add('wiggle');
    setTimeout(() => {
        element.classList.remove('wiggle');
    }, 500);
}

// Story page navigation
let currentPage = 1;
const totalPages = document.querySelectorAll('.story-page').length;

function showPage(pageNum) {
    // Hide all pages
    document.querySelectorAll('.story-page').forEach(page => {
        page.classList.remove('active');
    });

    // Show current page
    const currentPageElement = document.getElementById(`page-${pageNum}`);
    if (currentPageElement) {
        currentPageElement.classList.add('active');
    }

    // Update navigation buttons
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const pageCounter = document.getElementById('page-counter');

    if (prevBtn) {
        prevBtn.disabled = pageNum === 1;
    }
    if (nextBtn) {
        nextBtn.disabled = pageNum === totalPages;
    }
    if (pageCounter) {
        pageCounter.textContent = `Page ${pageNum} of ${totalPages}`;
    }

    currentPage = pageNum;
}

function nextPage() {
    if (currentPage < totalPages) {
        showPage(currentPage + 1);
        playPageSound();
    }
}

function prevPage() {
    if (currentPage > 1) {
        showPage(currentPage - 1);
        playPageSound();
    }
}

function playPageSound() {
    // Create a simple page turn sound effect using Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 400;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}

// Interactive egg collection
let eggsCollected = 0;
const totalEggs = document.querySelectorAll('.egg').length;

function collectEgg(eggElement) {
    if (!eggElement.classList.contains('collected')) {
        eggElement.classList.add('collected');
        eggsCollected++;

        // Create sparkle effect
        createSparkle(eggElement);

        // Play collection sound
        playCollectSound();

        // Update egg counter if exists
        const counter = document.getElementById('egg-counter');
        if (counter) {
            counter.textContent = `Eggs Found: ${eggsCollected}/${totalEggs}`;
        }

        // Check if all eggs collected
        if (eggsCollected === totalEggs && totalEggs > 0) {
            showCelebration();
        }
    }
}

function createSparkle(element) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.position = 'absolute';
    sparkle.style.width = '20px';
    sparkle.style.height = '20px';
    sparkle.style.background = 'radial-gradient(circle, gold, transparent)';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.animation = 'sparkleAnim 0.5s ease-out';

    const rect = element.getBoundingClientRect();
    sparkle.style.left = rect.left + rect.width / 2 - 10 + 'px';
    sparkle.style.top = rect.top + rect.height / 2 - 10 + 'px';

    document.body.appendChild(sparkle);

    setTimeout(() => {
        sparkle.remove();
    }, 500);
}

function playCollectSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(523, audioContext.currentTime); // C5
    oscillator.frequency.exponentialRampToValueAtTime(1047, audioContext.currentTime + 0.1); // C6
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
}

function showCelebration() {
    const celebration = document.createElement('div');
    celebration.innerHTML = '🎉 Great job! You found all the eggs! 🎉';
    celebration.style.position = 'fixed';
    celebration.style.top = '50%';
    celebration.style.left = '50%';
    celebration.style.transform = 'translate(-50%, -50%)';
    celebration.style.background = 'linear-gradient(145deg, #ff6b6b, #ffd93d)';
    celebration.style.color = 'white';
    celebration.style.padding = '30px';
    celebration.style.borderRadius = '20px';
    celebration.style.fontSize = '2rem';
    celebration.style.zIndex = '1000';
    celebration.style.animation = 'bounce 1s infinite';

    document.body.appendChild(celebration);

    setTimeout(() => {
        celebration.remove();
    }, 3000);
}

// Add sparkle animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkleAnim {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: scale(3) rotate(180deg);
            opacity: 0;
        }
    }

    .collected {
        opacity: 0.3;
        transform: scale(0.8);
        transition: all 0.3s;
    }
`;
document.head.appendChild(style);

// Initialize page on load
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.story-page')) {
        showPage(1);
    }
});