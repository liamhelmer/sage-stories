/**
 * Sage Stories - Story Engine Library
 * Reusable components for interactive children's stories
 * Version: 1.0.0
 */

class StoryEngine {
    constructor(config = {}) {
        // Story configuration
        this.config = {
            totalPages: config.totalPages || 20,
            title: config.title || 'Story Title',
            audioEnabled: config.audioEnabled !== false,
            audioPath: config.audioPath || 'audio/',
            eggHuntEnabled: config.eggHuntEnabled || false,
            totalEggs: config.totalEggs || 0,
            pageTransitionSound: config.pageTransitionSound !== false,
            ...config
        };

        // State management
        this.currentPage = 1;
        this.eggsCollected = 0;
        this.audioElement = null;
        this.isPlaying = false;

        // Initialize on DOM ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    init() {
        this.setupAudio();
        this.setupNavigation();
        this.setupKeyboardControls();
        this.setupEggHunt();
        this.showPage(1);
        this.updateHeader();
    }

    setupAudio() {
        if (!this.config.audioEnabled) return;

        // Create audio element
        this.audioElement = document.getElementById('page-audio');
        if (!this.audioElement) {
            this.audioElement = document.createElement('audio');
            this.audioElement.id = 'page-audio';
            this.audioElement.preload = 'auto';
            document.body.appendChild(this.audioElement);
        }

        // Setup audio button
        const audioBtn = document.getElementById('audio-btn');
        if (audioBtn) {
            audioBtn.addEventListener('click', () => this.toggleAudio());
        }
    }

    setupNavigation() {
        // Previous button
        const prevBtn = document.getElementById('prev-btn');
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.prevPage());
        }

        // Next button
        const nextBtn = document.getElementById('next-btn');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextPage());
        }
    }

    setupKeyboardControls() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.prevPage();
            } else if (e.key === 'ArrowRight') {
                this.nextPage();
            } else if (e.key === ' ') {
                e.preventDefault();
                this.toggleAudio();
            }
        });
    }

    setupEggHunt() {
        if (!this.config.eggHuntEnabled) return;

        // Add click handlers to all eggs
        document.querySelectorAll('.egg').forEach(egg => {
            egg.addEventListener('click', () => this.collectEgg(egg));
        });

        // Update counter
        this.updateEggCounter();
    }

    showPage(pageNum) {
        // Validate page number
        if (pageNum < 1 || pageNum > this.config.totalPages) return;

        // Stop current audio
        if (this.audioElement && !this.audioElement.paused) {
            this.audioElement.pause();
            this.updateAudioButton(false);
        }

        // Hide all pages
        document.querySelectorAll('.story-page').forEach(page => {
            page.classList.remove('active');
        });

        // Show current page
        const currentPageElement = document.getElementById(`page-${pageNum}`);
        if (currentPageElement) {
            currentPageElement.classList.add('active');
        }

        // Update page counters
        document.querySelectorAll('.page-counter').forEach(counter => {
            counter.textContent = `Page ${pageNum} of ${this.config.totalPages}`;
        });

        // Update navigation buttons
        this.updateNavigationButtons(pageNum);

        // Update current page
        this.currentPage = pageNum;

        // Load page audio if available
        if (this.config.audioEnabled) {
            this.loadPageAudio(pageNum);
        }

        // Play transition sound
        if (this.config.pageTransitionSound && pageNum !== 1) {
            this.playPageTurnSound();
        }

        // Trigger custom page change event
        this.triggerEvent('pagechange', { page: pageNum });
    }

    nextPage() {
        if (this.currentPage < this.config.totalPages) {
            this.showPage(this.currentPage + 1);
        }
    }

    prevPage() {
        if (this.currentPage > 1) {
            this.showPage(this.currentPage - 1);
        }
    }

    updateNavigationButtons(pageNum) {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');

        if (prevBtn) {
            prevBtn.disabled = pageNum === 1;
        }
        if (nextBtn) {
            nextBtn.disabled = pageNum === this.config.totalPages;
        }
    }

    loadPageAudio(pageNum) {
        if (!this.audioElement) return;

        const audioPath = `${this.config.audioPath}page-${pageNum}.mp3`;
        this.audioElement.src = audioPath;
    }

    toggleAudio() {
        if (!this.audioElement) return;

        if (this.audioElement.paused) {
            this.audioElement.play()
                .then(() => {
                    this.isPlaying = true;
                    this.updateAudioButton(true);
                })
                .catch(error => {
                    console.error('Error playing audio:', error);
                });
        } else {
            this.audioElement.pause();
            this.isPlaying = false;
            this.updateAudioButton(false);
        }
    }

    updateAudioButton(isPlaying) {
        const audioBtn = document.getElementById('audio-btn');
        if (audioBtn) {
            if (isPlaying) {
                audioBtn.classList.add('playing');
                audioBtn.innerHTML = '⏸️';
            } else {
                audioBtn.classList.remove('playing');
                audioBtn.innerHTML = '🔊';
            }
        }
    }

    collectEgg(eggElement) {
        if (eggElement.classList.contains('collected')) return;

        eggElement.classList.add('collected');
        this.eggsCollected++;

        // Create visual effect
        this.createSparkleEffect(eggElement);

        // Play sound
        this.playCollectSound();

        // Update counter
        this.updateEggCounter();

        // Check if all eggs collected
        if (this.eggsCollected === this.config.totalEggs && this.config.totalEggs > 0) {
            this.showCelebration();
            this.triggerEvent('allEggsCollected', { total: this.eggsCollected });
        }

        // Trigger egg collected event
        this.triggerEvent('eggCollected', { count: this.eggsCollected });
    }

    updateEggCounter() {
        const counter = document.getElementById('egg-count');
        if (counter) {
            counter.textContent = this.eggsCollected;
        }

        const fullCounter = document.getElementById('egg-counter');
        if (fullCounter) {
            fullCounter.innerHTML = `Eggs Found: <span id="egg-count">${this.eggsCollected}</span>/${this.config.totalEggs}`;
        }
    }

    updateHeader() {
        const titleElement = document.querySelector('.story-title');
        if (titleElement && this.config.title) {
            titleElement.textContent = this.config.title;
        }

        // Hide egg counter if egg hunt is disabled
        const eggCounter = document.getElementById('egg-counter');
        if (eggCounter && !this.config.eggHuntEnabled) {
            eggCounter.style.display = 'none';
        }
    }

    createSparkleEffect(element) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle-effect';

        const rect = element.getBoundingClientRect();
        sparkle.style.position = 'fixed';
        sparkle.style.left = rect.left + rect.width / 2 + 'px';
        sparkle.style.top = rect.top + rect.height / 2 + 'px';
        sparkle.style.transform = 'translate(-50%, -50%)';

        document.body.appendChild(sparkle);

        setTimeout(() => sparkle.remove(), 1000);
    }

    playPageTurnSound() {
        this.playSound(400, 'sine', 0.05, 0.1);
    }

    playCollectSound() {
        // Play two-tone collect sound
        this.playSound(523, 'sine', 0.1, 0.1); // C5
        setTimeout(() => {
            this.playSound(659, 'sine', 0.1, 0.1); // E5
        }, 100);
    }

    playSound(frequency, type = 'sine', volume = 0.1, duration = 0.2) {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.value = frequency;
            oscillator.type = type;

            gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + duration);
        } catch (error) {
            console.warn('Web Audio API not supported:', error);
        }
    }

    showCelebration() {
        const celebration = document.createElement('div');
        celebration.className = 'celebration-overlay';
        celebration.innerHTML = `
            <div class="celebration-content">
                <h2>🎉 Congratulations! 🎉</h2>
                <p>You found all ${this.config.totalEggs} eggs!</p>
                <p>Great job!</p>
            </div>
        `;

        document.body.appendChild(celebration);

        setTimeout(() => {
            celebration.classList.add('fade-out');
            setTimeout(() => celebration.remove(), 500);
        }, 3000);
    }

    triggerEvent(eventName, detail = {}) {
        const event = new CustomEvent(`story:${eventName}`, { detail });
        document.dispatchEvent(event);
    }

    // Public API methods
    getCurrentPage() {
        return this.currentPage;
    }

    getTotalPages() {
        return this.config.totalPages;
    }

    getEggsCollected() {
        return this.eggsCollected;
    }

    setConfig(key, value) {
        this.config[key] = value;
        if (key === 'title') {
            this.updateHeader();
        }
    }
}

// Export for use in stories
window.StoryEngine = StoryEngine;