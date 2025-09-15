// Text-to-Speech Story Reader with Enhanced Controls

class StoryReader {
    constructor() {
        this.synth = window.speechSynthesis;
        this.utterance = null;
        this.currentPage = 1;
        this.totalPages = 20;
        this.isReading = false;
        this.isPaused = false;
        this.voices = [];
        this.selectedVoice = null;
        this.readingSpeed = 1.0;
        this.currentParagraphIndex = 0;
        this.paragraphsToRead = [];

        this.initializeElements();
        this.loadVoices();
        this.setupEventListeners();
        this.initializePageNavigation();
    }

    initializeElements() {
        // Audio control elements
        this.playBtn = document.getElementById('playBtn');
        this.pauseBtn = document.getElementById('pauseBtn');
        this.stopBtn = document.getElementById('stopBtn');
        this.voiceSelect = document.getElementById('voiceSelect');
        this.speedRange = document.getElementById('speedRange');
        this.speedValue = document.getElementById('speedValue');
        this.progressFill = document.getElementById('progressFill');
        this.progressText = document.getElementById('progressText');

        // Page navigation elements
        this.prevPageBtn = document.getElementById('prevPage');
        this.nextPageBtn = document.getElementById('nextPage');
        this.prevPageBtnBottom = document.getElementById('prevPageBottom');
        this.nextPageBtnBottom = document.getElementById('nextPageBottom');
        this.currentPageDisplay = document.getElementById('currentPage');
        this.currentPageDisplayBottom = document.getElementById('currentPageBottom');
        this.totalPagesDisplay = document.getElementById('totalPages');
        this.totalPagesDisplayBottom = document.getElementById('totalPagesBottom');
        this.storyPages = document.querySelectorAll('.story-page-content');
    }

    loadVoices() {
        // Load available voices
        const loadVoiceList = () => {
            this.voices = this.synth.getVoices();

            // Clear existing options
            this.voiceSelect.innerHTML = '<option value="">Default Voice</option>';

            // Filter for English voices and add to select
            const englishVoices = this.voices.filter(voice =>
                voice.lang.startsWith('en')
            );

            englishVoices.forEach((voice, index) => {
                const option = document.createElement('option');
                option.value = index;
                option.textContent = `${voice.name} (${voice.lang})`;

                // Prefer voices good for children's stories
                if (voice.name.includes('Female') || voice.name.includes('Samantha') ||
                    voice.name.includes('Victoria') || voice.name.includes('Karen')) {
                    option.selected = true;
                    this.selectedVoice = voice;
                }

                this.voiceSelect.appendChild(option);
            });
        };

        // Load voices when they're ready
        if (this.synth.getVoices().length > 0) {
            loadVoiceList();
        } else {
            this.synth.addEventListener('voiceschanged', loadVoiceList);
        }
    }

    setupEventListeners() {
        // Play button
        this.playBtn.addEventListener('click', () => this.startReading());

        // Pause button
        this.pauseBtn.addEventListener('click', () => this.pauseReading());

        // Stop button
        this.stopBtn.addEventListener('click', () => this.stopReading());

        // Voice selection
        this.voiceSelect.addEventListener('change', (e) => {
            const selectedIndex = e.target.value;
            if (selectedIndex !== '') {
                this.selectedVoice = this.voices[selectedIndex];
            } else {
                this.selectedVoice = null;
            }

            // If currently reading, restart with new voice
            if (this.isReading) {
                this.stopReading();
                this.startReading();
            }
        });

        // Speed control
        this.speedRange.addEventListener('input', (e) => {
            this.readingSpeed = parseFloat(e.target.value);
            this.speedValue.textContent = `${this.readingSpeed}x`;

            // If currently reading, restart with new speed
            if (this.isReading) {
                this.stopReading();
                this.startReading();
            }
        });

        // Page navigation
        this.prevPageBtn.addEventListener('click', () => this.goToPreviousPage());
        this.nextPageBtn.addEventListener('click', () => this.goToNextPage());
        this.prevPageBtnBottom.addEventListener('click', () => this.goToPreviousPage());
        this.nextPageBtnBottom.addEventListener('click', () => this.goToNextPage());
    }

    initializePageNavigation() {
        // Set total pages
        this.totalPagesDisplay.textContent = this.totalPages;
        this.totalPagesDisplayBottom.textContent = this.totalPages;

        // Show first page
        this.showPage(1);
    }

    showPage(pageNumber) {
        // Hide all pages
        this.storyPages.forEach(page => {
            page.classList.remove('active');
        });

        // Show selected page
        const selectedPage = document.querySelector(`[data-page="${pageNumber}"]`);
        if (selectedPage) {
            selectedPage.classList.add('active');

            // Update page displays
            this.currentPage = pageNumber;
            this.currentPageDisplay.textContent = pageNumber;
            this.currentPageDisplayBottom.textContent = pageNumber;

            // Update navigation buttons
            this.updateNavigationButtons();

            // Stop reading if changing pages
            if (this.isReading) {
                this.stopReading();
            }

            // Scroll to top of content
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    updateNavigationButtons() {
        // Previous page buttons
        const prevDisabled = this.currentPage <= 1;
        this.prevPageBtn.disabled = prevDisabled;
        this.prevPageBtnBottom.disabled = prevDisabled;

        // Next page buttons
        const nextDisabled = this.currentPage >= this.totalPages;
        this.nextPageBtn.disabled = nextDisabled;
        this.nextPageBtnBottom.disabled = nextDisabled;
    }

    goToPreviousPage() {
        if (this.currentPage > 1) {
            this.showPage(this.currentPage - 1);
        }
    }

    goToNextPage() {
        if (this.currentPage < this.totalPages) {
            this.showPage(this.currentPage + 1);
        }
    }

    startReading() {
        if (this.isPaused && this.synth.paused) {
            // Resume if paused
            this.synth.resume();
            this.isPaused = false;
            this.updateReadingUI(true);
            return;
        }

        // Get text from current page
        const currentPageElement = document.querySelector(`[data-page="${this.currentPage}"] .page-text`);
        if (!currentPageElement) return;

        // Get all paragraphs with reading data
        this.paragraphsToRead = currentPageElement.querySelectorAll('[data-reading]');
        if (this.paragraphsToRead.length === 0) {
            // Fallback to regular paragraphs
            this.paragraphsToRead = currentPageElement.querySelectorAll('.story-paragraph');
        }

        this.currentParagraphIndex = 0;
        this.isReading = true;
        this.updateReadingUI(true);

        // Start reading from the first paragraph
        this.readNextParagraph();
    }

    readNextParagraph() {
        if (this.currentParagraphIndex >= this.paragraphsToRead.length) {
            // Finished reading all paragraphs
            this.onReadingComplete();
            return;
        }

        const paragraph = this.paragraphsToRead[this.currentParagraphIndex];
        const text = paragraph.dataset.reading || paragraph.textContent;

        // Highlight current paragraph
        this.highlightParagraph(paragraph);

        // Create utterance
        this.utterance = new SpeechSynthesisUtterance(text);
        this.utterance.rate = this.readingSpeed;
        this.utterance.pitch = 1.1; // Slightly higher pitch for friendlier sound
        this.utterance.volume = 1.0;

        if (this.selectedVoice) {
            this.utterance.voice = this.selectedVoice;
        }

        // Set up event handlers
        this.utterance.onend = () => {
            this.unhighlightParagraph(paragraph);
            this.currentParagraphIndex++;
            this.updateProgress();

            if (this.isReading) {
                // Small pause between paragraphs
                setTimeout(() => this.readNextParagraph(), 500);
            }
        };

        this.utterance.onerror = (event) => {
            console.error('Speech synthesis error:', event);
            this.stopReading();
        };

        // Start speaking
        this.synth.speak(this.utterance);
        this.updateProgress();
    }

    pauseReading() {
        if (this.isReading && !this.isPaused) {
            this.synth.pause();
            this.isPaused = true;
            this.updateReadingUI(false);
            this.progressText.textContent = 'Paused';
        }
    }

    stopReading() {
        if (this.isReading || this.isPaused) {
            this.synth.cancel();
            this.isReading = false;
            this.isPaused = false;
            this.currentParagraphIndex = 0;

            // Clear highlights
            document.querySelectorAll('.story-paragraph.reading').forEach(p => {
                p.classList.remove('reading');
            });

            this.updateReadingUI(false);
            this.progressFill.style.width = '0%';
            this.progressText.textContent = 'Ready to read';
        }
    }

    highlightParagraph(paragraph) {
        // Remove previous highlights
        document.querySelectorAll('.story-paragraph.reading').forEach(p => {
            p.classList.remove('reading');
        });

        // Add highlight to current paragraph
        paragraph.classList.add('reading');

        // Scroll to paragraph if needed
        const rect = paragraph.getBoundingClientRect();
        const isInViewport = rect.top >= 0 && rect.bottom <= window.innerHeight;

        if (!isInViewport) {
            paragraph.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    unhighlightParagraph(paragraph) {
        paragraph.classList.remove('reading');
    }

    updateProgress() {
        const progress = ((this.currentParagraphIndex + 1) / this.paragraphsToRead.length) * 100;
        this.progressFill.style.width = `${progress}%`;

        if (this.isReading && !this.isPaused) {
            this.progressText.textContent = `Reading page ${this.currentPage} - Paragraph ${this.currentParagraphIndex + 1} of ${this.paragraphsToRead.length}`;
        }
    }

    updateReadingUI(isReading) {
        if (isReading) {
            this.playBtn.style.display = 'none';
            this.pauseBtn.style.display = 'flex';
            if (!this.isPaused) {
                this.progressText.textContent = `Reading page ${this.currentPage}...`;
            }
        } else {
            this.playBtn.style.display = 'flex';
            this.pauseBtn.style.display = 'none';
        }
    }

    onReadingComplete() {
        this.isReading = false;
        this.updateReadingUI(false);
        this.progressFill.style.width = '100%';
        this.progressText.textContent = 'Finished reading page ' + this.currentPage;

        // Auto-advance to next page after a delay (optional)
        if (this.currentPage < this.totalPages) {
            setTimeout(() => {
                if (!this.isReading) { // Check if user hasn't started reading again
                    this.progressText.textContent = 'Ready for next page';
                }
            }, 2000);
        } else {
            this.progressText.textContent = 'Story complete! 🎉';
        }
    }
}

// Initialize the story reader when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Check if Speech Synthesis is supported
    if ('speechSynthesis' in window) {
        const reader = new StoryReader();

        // Add keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Spacebar to play/pause
            if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
                e.preventDefault();
                if (reader.isReading && !reader.isPaused) {
                    reader.pauseReading();
                } else {
                    reader.startReading();
                }
            }

            // Arrow keys for navigation
            if (e.code === 'ArrowLeft') {
                reader.goToPreviousPage();
            } else if (e.code === 'ArrowRight') {
                reader.goToNextPage();
            }

            // Escape to stop
            if (e.code === 'Escape') {
                reader.stopReading();
            }
        });
    } else {
        // Hide audio controls if not supported
        const audioBar = document.querySelector('.audio-controls-bar');
        if (audioBar) {
            audioBar.style.display = 'none';
        }
        console.warn('Text-to-speech is not supported in this browser');
    }
});