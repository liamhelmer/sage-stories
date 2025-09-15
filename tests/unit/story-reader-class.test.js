/**
 * @jest-environment jsdom
 */

// Test the enhanced StoryReader class
import fs from 'fs';
import path from 'path';

const storyReaderClassPath = path.join(process.cwd(), 'assets/js/story-reader.js');
const storyReaderClassContent = fs.readFileSync(storyReaderClassPath, 'utf8');

describe('StoryReader Class - Enhanced Text-to-Speech', () => {
  let storyReader;

  beforeEach(() => {
    // Set up complex DOM structure that StoryReader expects
    document.body.innerHTML = `
      <div class="audio-controls-bar">
        <button id="playBtn">▶️</button>
        <button id="pauseBtn">⏸️</button>
        <button id="stopBtn">⏹️</button>
        <select id="voiceSelect"><option value="">Default Voice</option></select>
        <input type="range" id="speedRange" min="0.5" max="2" step="0.1" value="1">
        <span id="speedValue">1.0x</span>
        <div id="progressFill"></div>
        <div id="progressText">Ready to read</div>
      </div>

      <div class="page-navigation">
        <button id="prevPage">Previous</button>
        <button id="nextPage">Next</button>
        <span id="currentPage">1</span>
        <span id="totalPages">20</span>
      </div>

      <div class="page-navigation-bottom">
        <button id="prevPageBottom">Previous</button>
        <button id="nextPageBottom">Next</button>
        <span id="currentPageBottom">1</span>
        <span id="totalPagesBottom">20</span>
      </div>

      <div class="story-page-content" data-page="1">
        <div class="page-text">
          <div class="story-paragraph" data-reading="First paragraph content">First paragraph</div>
          <div class="story-paragraph" data-reading="Second paragraph content">Second paragraph</div>
        </div>
      </div>

      <div class="story-page-content" data-page="2">
        <div class="page-text">
          <div class="story-paragraph" data-reading="Third paragraph content">Third paragraph</div>
        </div>
      </div>
    `;

    // Execute the StoryReader class code
    eval(storyReaderClassContent);

    // Create instance
    storyReader = new StoryReader();
  });

  describe('Constructor and Initialization', () => {
    test('should initialize with default values', () => {
      expect(storyReader.currentPage).toBe(1);
      expect(storyReader.totalPages).toBe(20);
      expect(storyReader.isReading).toBe(false);
      expect(storyReader.isPaused).toBe(false);
      expect(storyReader.readingSpeed).toBe(1.0);
      expect(storyReader.currentParagraphIndex).toBe(0);
    });

    test('should find and store DOM elements', () => {
      expect(storyReader.playBtn).toBeTruthy();
      expect(storyReader.pauseBtn).toBeTruthy();
      expect(storyReader.stopBtn).toBeTruthy();
      expect(storyReader.voiceSelect).toBeTruthy();
      expect(storyReader.speedRange).toBeTruthy();
    });

    test('should set up event listeners', () => {
      const playBtn = document.getElementById('playBtn');
      const clickEvent = new Event('click');

      // Mock startReading method
      storyReader.startReading = jest.fn();

      playBtn.dispatchEvent(clickEvent);
      expect(storyReader.startReading).toHaveBeenCalled();
    });
  });

  describe('Voice Loading', () => {
    test('should load and filter English voices', () => {
      const mockVoices = [
        { name: 'English Voice', lang: 'en-US' },
        { name: 'French Voice', lang: 'fr-FR' },
        { name: 'Samantha', lang: 'en-US' },
        { name: 'Spanish Voice', lang: 'es-ES' }
      ];

      speechSynthesis.getVoices.mockReturnValue(mockVoices);

      storyReader.loadVoices();

      const options = storyReader.voiceSelect.querySelectorAll('option');
      expect(options.length).toBe(3); // Default + 2 English voices
    });

    test('should prefer child-friendly voices', () => {
      const mockVoices = [
        { name: 'Standard Voice', lang: 'en-US' },
        { name: 'Samantha', lang: 'en-US' },
        { name: 'Robot Voice', lang: 'en-US' }
      ];

      speechSynthesis.getVoices.mockReturnValue(mockVoices);

      storyReader.loadVoices();

      // Should select Samantha automatically
      expect(storyReader.selectedVoice).toBe(mockVoices[1]);
    });
  });

  describe('Page Navigation', () => {
    test('should show correct page and update displays', () => {
      storyReader.showPage(2);

      expect(storyReader.currentPage).toBe(2);
      expect(document.getElementById('currentPage').textContent).toBe('2');
      expect(document.getElementById('currentPageBottom').textContent).toBe('2');

      const activePage = document.querySelector('[data-page="2"]');
      expect(activePage.classList.contains('active')).toBe(true);
    });

    test('should update navigation button states', () => {
      storyReader.showPage(1);
      expect(storyReader.prevPageBtn.disabled).toBe(true);
      expect(storyReader.nextPageBtn.disabled).toBe(false);

      storyReader.showPage(20);
      expect(storyReader.prevPageBtn.disabled).toBe(false);
      expect(storyReader.nextPageBtn.disabled).toBe(true);
    });

    test('should stop reading when changing pages', () => {
      storyReader.stopReading = jest.fn();
      storyReader.isReading = true;

      storyReader.showPage(2);

      expect(storyReader.stopReading).toHaveBeenCalled();
    });

    test('goToPreviousPage should work correctly', () => {
      storyReader.showPage(2);
      storyReader.showPage = jest.fn();

      storyReader.goToPreviousPage();

      expect(storyReader.showPage).toHaveBeenCalledWith(1);
    });

    test('goToNextPage should work correctly', () => {
      storyReader.showPage(1);
      storyReader.showPage = jest.fn();

      storyReader.goToNextPage();

      expect(storyReader.showPage).toHaveBeenCalledWith(2);
    });
  });

  describe('Reading Control', () => {
    test('startReading should resume if paused', () => {
      storyReader.isPaused = true;
      speechSynthesis.paused = true;
      storyReader.updateReadingUI = jest.fn();

      storyReader.startReading();

      expect(speechSynthesis.resume).toHaveBeenCalled();
      expect(storyReader.isPaused).toBe(false);
      expect(storyReader.updateReadingUI).toHaveBeenCalledWith(true);
    });

    test('startReading should begin new reading session', () => {
      storyReader.readNextParagraph = jest.fn();
      storyReader.updateReadingUI = jest.fn();

      storyReader.startReading();

      expect(storyReader.isReading).toBe(true);
      expect(storyReader.currentParagraphIndex).toBe(0);
      expect(storyReader.readNextParagraph).toHaveBeenCalled();
      expect(storyReader.updateReadingUI).toHaveBeenCalledWith(true);
    });

    test('pauseReading should pause speech and update state', () => {
      storyReader.isReading = true;
      storyReader.updateReadingUI = jest.fn();

      storyReader.pauseReading();

      expect(speechSynthesis.pause).toHaveBeenCalled();
      expect(storyReader.isPaused).toBe(true);
      expect(storyReader.updateReadingUI).toHaveBeenCalledWith(false);
    });

    test('stopReading should reset all reading state', () => {
      storyReader.isReading = true;
      storyReader.isPaused = true;
      storyReader.currentParagraphIndex = 5;
      storyReader.updateReadingUI = jest.fn();

      storyReader.stopReading();

      expect(speechSynthesis.cancel).toHaveBeenCalled();
      expect(storyReader.isReading).toBe(false);
      expect(storyReader.isPaused).toBe(false);
      expect(storyReader.currentParagraphIndex).toBe(0);
    });
  });

  describe('Paragraph Reading', () => {
    test('readNextParagraph should read paragraph content', () => {
      storyReader.paragraphsToRead = document.querySelectorAll('[data-reading]');
      storyReader.highlightParagraph = jest.fn();
      storyReader.updateProgress = jest.fn();

      storyReader.readNextParagraph();

      expect(SpeechSynthesisUtterance).toHaveBeenCalledWith('First paragraph content');
      expect(storyReader.highlightParagraph).toHaveBeenCalled();
      expect(speechSynthesis.speak).toHaveBeenCalled();
    });

    test('readNextParagraph should handle completion', () => {
      storyReader.paragraphsToRead = [];
      storyReader.onReadingComplete = jest.fn();

      storyReader.readNextParagraph();

      expect(storyReader.onReadingComplete).toHaveBeenCalled();
    });

    test('should advance to next paragraph after completion', (done) => {
      storyReader.paragraphsToRead = document.querySelectorAll('[data-reading]');
      storyReader.isReading = true;
      storyReader.highlightParagraph = jest.fn();
      storyReader.unhighlightParagraph = jest.fn();
      storyReader.updateProgress = jest.fn();

      // Mock readNextParagraph to prevent infinite recursion
      const originalReadNext = storyReader.readNextParagraph;
      storyReader.readNextParagraph = jest.fn().mockImplementation(function() {
        if (this.currentParagraphIndex === 0) {
          originalReadNext.call(this);
        }
      });

      storyReader.readNextParagraph();

      const utterance = SpeechSynthesisUtterance.mock.instances[0];

      // Simulate utterance end
      setTimeout(() => {
        utterance.onend();

        expect(storyReader.currentParagraphIndex).toBe(1);
        expect(storyReader.updateProgress).toHaveBeenCalled();
        done();
      }, 10);
    });
  });

  describe('Highlighting and Progress', () => {
    test('highlightParagraph should add reading class', () => {
      const paragraph = document.querySelector('.story-paragraph');

      storyReader.highlightParagraph(paragraph);

      expect(paragraph.classList.contains('reading')).toBe(true);
    });

    test('unhighlightParagraph should remove reading class', () => {
      const paragraph = document.querySelector('.story-paragraph');
      paragraph.classList.add('reading');

      storyReader.unhighlightParagraph(paragraph);

      expect(paragraph.classList.contains('reading')).toBe(false);
    });

    test('updateProgress should calculate and display progress', () => {
      storyReader.paragraphsToRead = document.querySelectorAll('[data-reading]');
      storyReader.currentParagraphIndex = 0;
      storyReader.currentPage = 1;
      storyReader.isReading = true;
      storyReader.isPaused = false;

      storyReader.updateProgress();

      expect(storyReader.progressFill.style.width).toBe('50%'); // 1/2 = 50%
      expect(storyReader.progressText.textContent).toBe('Reading page 1 - Paragraph 1 of 2');
    });
  });

  describe('UI Updates', () => {
    test('updateReadingUI should show/hide correct buttons', () => {
      storyReader.updateReadingUI(true);

      expect(storyReader.playBtn.style.display).toBe('none');
      expect(storyReader.pauseBtn.style.display).toBe('flex');

      storyReader.updateReadingUI(false);

      expect(storyReader.playBtn.style.display).toBe('flex');
      expect(storyReader.pauseBtn.style.display).toBe('none');
    });
  });

  describe('Speed and Voice Controls', () => {
    test('should update reading speed', () => {
      const speedRange = document.getElementById('speedRange');
      speedRange.value = '1.5';

      const changeEvent = new Event('input');
      speedRange.dispatchEvent(changeEvent);

      expect(storyReader.readingSpeed).toBe(1.5);
      expect(document.getElementById('speedValue').textContent).toBe('1.5x');
    });

    test('should change voice selection', () => {
      const mockVoices = [{ name: 'Test Voice', lang: 'en-US' }];
      speechSynthesis.getVoices.mockReturnValue(mockVoices);
      storyReader.voices = mockVoices;

      const voiceSelect = document.getElementById('voiceSelect');
      voiceSelect.value = '0';

      const changeEvent = new Event('change');
      voiceSelect.dispatchEvent(changeEvent);

      expect(storyReader.selectedVoice).toBe(mockVoices[0]);
    });
  });

  describe('Keyboard Shortcuts', () => {
    test('should handle spacebar for play/pause', () => {
      storyReader.startReading = jest.fn();
      storyReader.pauseReading = jest.fn();
      storyReader.isReading = false;

      const spaceEvent = new KeyboardEvent('keydown', { code: 'Space' });
      document.dispatchEvent(spaceEvent);

      expect(storyReader.startReading).toHaveBeenCalled();
    });

    test('should handle arrow keys for navigation', () => {
      storyReader.goToPreviousPage = jest.fn();
      storyReader.goToNextPage = jest.fn();

      const leftEvent = new KeyboardEvent('keydown', { code: 'ArrowLeft' });
      const rightEvent = new KeyboardEvent('keydown', { code: 'ArrowRight' });

      document.dispatchEvent(leftEvent);
      document.dispatchEvent(rightEvent);

      expect(storyReader.goToPreviousPage).toHaveBeenCalled();
      expect(storyReader.goToNextPage).toHaveBeenCalled();
    });

    test('should handle escape key for stop', () => {
      storyReader.stopReading = jest.fn();

      const escapeEvent = new KeyboardEvent('keydown', { code: 'Escape' });
      document.dispatchEvent(escapeEvent);

      expect(storyReader.stopReading).toHaveBeenCalled();
    });
  });

  describe('Error Handling', () => {
    test('should handle speech synthesis errors gracefully', () => {
      storyReader.paragraphsToRead = document.querySelectorAll('[data-reading]');
      storyReader.stopReading = jest.fn();

      storyReader.readNextParagraph();

      const utterance = SpeechSynthesisUtterance.mock.instances[0];
      utterance.onerror(new Error('Test error'));

      expect(storyReader.stopReading).toHaveBeenCalled();
    });

    test('should handle missing page elements', () => {
      // Remove all story pages
      document.querySelectorAll('.story-page-content').forEach(page => page.remove());

      expect(() => storyReader.startReading()).not.toThrow();
    });
  });

  describe('Completion Handling', () => {
    test('onReadingComplete should update UI correctly', () => {
      storyReader.currentPage = 1;
      storyReader.totalPages = 20;
      storyReader.updateReadingUI = jest.fn();

      storyReader.onReadingComplete();

      expect(storyReader.isReading).toBe(false);
      expect(storyReader.progressFill.style.width).toBe('100%');
      expect(storyReader.progressText.textContent).toBe('Finished reading page 1');
    });

    test('should show story complete message on last page', () => {
      storyReader.currentPage = 20;
      storyReader.totalPages = 20;
      storyReader.updateReadingUI = jest.fn();

      storyReader.onReadingComplete();

      setTimeout(() => {
        expect(storyReader.progressText.textContent).toBe('Story complete! 🎉');
      }, 2100);
    });
  });
});