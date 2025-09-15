/**
 * @jest-environment jsdom
 */

// Test the basic story-reader.js functionality
import fs from 'fs';
import path from 'path';

const storyReaderPath = path.join(process.cwd(), 'docs/js/story-reader.js');
const storyReaderContent = fs.readFileSync(storyReaderPath, 'utf8');

describe('story-reader.js - Text-to-Speech Basic Functions', () => {
  beforeEach(() => {
    // Reset global variables and mocks
    global.currentSpeech = null;

    // Execute story-reader.js in current context
    eval(storyReaderContent);

    // Set up DOM structure
    document.body.innerHTML = `
      <div id="page-1" class="story-page">
        <div class="page-text">This is the first page of our story.</div>
        <button class="read-aloud-btn">🔊 Read to Me!</button>
      </div>
      <div id="page-2" class="story-page">
        <div class="page-text">This is the second page with more content.</div>
        <button class="read-aloud-btn">🔊 Read to Me!</button>
      </div>
    `;
  });

  describe('readPageAloud function', () => {
    test('should cancel current speech before starting new one', () => {
      const mockUtterance = new SpeechSynthesisUtterance('test');
      global.currentSpeech = mockUtterance;

      readPageAloud(1);

      expect(speechSynthesis.cancel).toHaveBeenCalled();
    });

    test('should create speech utterance with page text', () => {
      readPageAloud(1);

      expect(SpeechSynthesisUtterance).toHaveBeenCalledWith('This is the first page of our story.');
    });

    test('should configure child-friendly speech settings', () => {
      readPageAloud(1);

      expect(SpeechSynthesisUtterance).toHaveBeenCalled();
      const utteranceCall = SpeechSynthesisUtterance.mock.instances[0];
      expect(utteranceCall.rate).toBe(0.85);
      expect(utteranceCall.pitch).toBe(1.1);
      expect(utteranceCall.volume).toBe(1.0);
    });

    test('should select friendly voice when available', () => {
      const mockVoices = [
        { name: 'Standard Voice', lang: 'en-US' },
        { name: 'Samantha', lang: 'en-US' },
        { name: 'Robot Voice', lang: 'en-UK' }
      ];

      speechSynthesis.getVoices.mockReturnValue(mockVoices);

      readPageAloud(1);

      const utteranceCall = SpeechSynthesisUtterance.mock.instances[0];
      expect(utteranceCall.voice).toBe(mockVoices[1]); // Should select Samantha
    });

    test('should update read button state', () => {
      readPageAloud(1);

      const readButton = document.querySelector('#page-1 .read-aloud-btn');
      expect(readButton.classList.contains('reading')).toBe(true);
      expect(readButton.innerHTML).toBe('🔊 Reading...');
    });

    test('should handle speech end event', () => {
      readPageAloud(1);

      const utteranceCall = SpeechSynthesisUtterance.mock.instances[0];
      const readButton = document.querySelector('#page-1 .read-aloud-btn');

      // Simulate speech end
      utteranceCall.onend();

      expect(readButton.classList.contains('reading')).toBe(false);
      expect(readButton.innerHTML).toBe('🔊 Read to Me!');
    });

    test('should handle speech error event', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      readPageAloud(1);

      const utteranceCall = SpeechSynthesisUtterance.mock.instances[0];
      const readButton = document.querySelector('#page-1 .read-aloud-btn');

      // Simulate speech error
      utteranceCall.onerror();

      expect(readButton.classList.contains('reading')).toBe(false);
      expect(readButton.innerHTML).toBe('🔊 Read to Me!');
      expect(consoleSpy).toHaveBeenCalledWith('Speech synthesis error');

      consoleSpy.mockRestore();
    });

    test('should start speaking', () => {
      readPageAloud(1);

      expect(speechSynthesis.speak).toHaveBeenCalled();
    });

    test('should handle missing page element', () => {
      expect(() => readPageAloud(999)).not.toThrow();
      expect(SpeechSynthesisUtterance).not.toHaveBeenCalled();
    });

    test('should handle missing text element', () => {
      document.getElementById('page-1').innerHTML = '<div>No page-text class</div>';

      expect(() => readPageAloud(1)).not.toThrow();
      expect(SpeechSynthesisUtterance).not.toHaveBeenCalled();
    });
  });

  describe('stopReading function', () => {
    test('should cancel speech synthesis', () => {
      speechSynthesis.speaking = true;

      stopReading();

      expect(speechSynthesis.cancel).toHaveBeenCalled();
    });

    test('should reset all read buttons', () => {
      // Set up buttons in reading state
      const buttons = document.querySelectorAll('.read-aloud-btn');
      buttons.forEach(btn => {
        btn.classList.add('reading');
        btn.innerHTML = '🔊 Reading...';
      });

      stopReading();

      buttons.forEach(btn => {
        expect(btn.classList.contains('reading')).toBe(false);
        expect(btn.innerHTML).toBe('🔊 Read to Me!');
      });
    });

    test('should not error if not currently speaking', () => {
      speechSynthesis.speaking = false;

      expect(() => stopReading()).not.toThrow();
    });
  });

  describe('Voice Loading', () => {
    test('should log available voices when loaded', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      const mockVoices = [
        { name: 'Voice1', lang: 'en-US' },
        { name: 'Voice2', lang: 'en-UK' }
      ];

      speechSynthesis.getVoices.mockReturnValue(mockVoices);

      // Simulate voices changed event
      if (speechSynthesis.onvoiceschanged) {
        speechSynthesis.onvoiceschanged();
      }

      expect(consoleSpy).toHaveBeenCalledWith('Available voices loaded:', 2);

      consoleSpy.mockRestore();
    });
  });

  describe('Page Change Integration', () => {
    test('should stop reading when page changes', () => {
      // Mock showPage function exists
      global.showPage = jest.fn();

      // Re-execute to override showPage
      eval(storyReaderContent);

      const stopReadingSpy = jest.spyOn(global, 'stopReading');

      // Call the wrapped showPage function
      window.showPage(2);

      expect(stopReadingSpy).toHaveBeenCalled();
      expect(global.showPage).toHaveBeenCalledWith(2);
    });
  });

  describe('beforeunload Event', () => {
    test('should stop reading when leaving page', () => {
      const stopReadingSpy = jest.spyOn(global, 'stopReading');

      // Simulate beforeunload event
      window.dispatchEvent(new Event('beforeunload'));

      expect(stopReadingSpy).toHaveBeenCalled();
    });
  });
});