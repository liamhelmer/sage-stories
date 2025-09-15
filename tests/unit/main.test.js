/**
 * @jest-environment jsdom
 */

// Import the functions from main.js
// Since main.js is not a module, we'll load it directly
import fs from 'fs';
import path from 'path';

// Load main.js content
const mainJsPath = path.join(process.cwd(), 'docs/js/main.js');
const mainJsContent = fs.readFileSync(mainJsPath, 'utf8');

describe('main.js - Interactive Story Functions', () => {
  beforeEach(() => {
    // Execute main.js in current context
    eval(mainJsContent);

    // Set up DOM structure
    document.body.innerHTML = `
      <div class="story-page" id="page-1">Page 1 content</div>
      <div class="story-page" id="page-2">Page 2 content</div>
      <div class="story-page" id="page-3">Page 3 content</div>
      <button id="prev-btn">Previous</button>
      <button id="next-btn">Next</button>
      <div id="page-counter"></div>
      <div class="egg" data-egg="1">🥚</div>
      <div class="egg" data-egg="2">🥚</div>
      <div id="egg-counter"></div>
    `;
  });

  describe('wiggle function', () => {
    test('should add wiggle class and remove it after 500ms', (done) => {
      const element = document.createElement('div');

      wiggle(element);

      expect(element.classList.contains('wiggle')).toBe(true);

      setTimeout(() => {
        expect(element.classList.contains('wiggle')).toBe(false);
        done();
      }, 600);
    });
  });

  describe('showPage function', () => {
    test('should show correct page and hide others', () => {
      showPage(2);

      expect(document.getElementById('page-1').classList.contains('active')).toBe(false);
      expect(document.getElementById('page-2').classList.contains('active')).toBe(true);
      expect(document.getElementById('page-3').classList.contains('active')).toBe(false);
    });

    test('should update page counter', () => {
      showPage(2);

      const pageCounter = document.getElementById('page-counter');
      expect(pageCounter.textContent).toBe('Page 2 of 3');
    });

    test('should disable prev button on first page', () => {
      showPage(1);

      const prevBtn = document.getElementById('prev-btn');
      expect(prevBtn.disabled).toBe(true);
    });

    test('should disable next button on last page', () => {
      showPage(3);

      const nextBtn = document.getElementById('next-btn');
      expect(nextBtn.disabled).toBe(true);
    });

    test('should handle non-existent page gracefully', () => {
      expect(() => showPage(999)).not.toThrow();
    });
  });

  describe('nextPage function', () => {
    test('should advance to next page', () => {
      // Set current page to 1
      showPage(1);

      nextPage();

      expect(document.getElementById('page-2').classList.contains('active')).toBe(true);
    });

    test('should not advance beyond last page', () => {
      showPage(3);

      nextPage();

      expect(document.getElementById('page-3').classList.contains('active')).toBe(true);
    });

    test('should play page sound', () => {
      const audioContextSpy = jest.spyOn(global, 'AudioContext');

      showPage(1);
      nextPage();

      expect(audioContextSpy).toHaveBeenCalled();
    });
  });

  describe('prevPage function', () => {
    test('should go to previous page', () => {
      showPage(2);

      prevPage();

      expect(document.getElementById('page-1').classList.contains('active')).toBe(true);
    });

    test('should not go before first page', () => {
      showPage(1);

      prevPage();

      expect(document.getElementById('page-1').classList.contains('active')).toBe(true);
    });
  });

  describe('collectEgg function', () => {
    test('should mark egg as collected', () => {
      const egg = document.querySelector('.egg');

      collectEgg(egg);

      expect(egg.classList.contains('collected')).toBe(true);
    });

    test('should increment eggs collected counter', () => {
      const egg = document.querySelector('.egg');

      collectEgg(egg);

      const counter = document.getElementById('egg-counter');
      expect(counter.textContent).toBe('Eggs Found: 1/2');
    });

    test('should not collect same egg twice', () => {
      const egg = document.querySelector('.egg');

      collectEgg(egg);
      collectEgg(egg); // Try to collect again

      const counter = document.getElementById('egg-counter');
      expect(counter.textContent).toBe('Eggs Found: 1/2');
    });

    test('should show celebration when all eggs collected', () => {
      const eggs = document.querySelectorAll('.egg');

      eggs.forEach(egg => collectEgg(egg));

      // Check if celebration element was created
      const celebration = document.querySelector('div[style*="position: fixed"]');
      expect(celebration).toBeTruthy();
      expect(celebration.textContent).toContain('Great job! You found all the eggs!');
    });

    test('should play collection sound', () => {
      const audioContextSpy = jest.spyOn(global, 'AudioContext');
      const egg = document.querySelector('.egg');

      collectEgg(egg);

      expect(audioContextSpy).toHaveBeenCalled();
    });
  });

  describe('createSparkle function', () => {
    test('should create sparkle element', () => {
      const element = document.createElement('div');
      element.getBoundingClientRect = () => ({ left: 100, top: 100, width: 50, height: 50 });

      createSparkle(element);

      const sparkle = document.querySelector('.sparkle');
      expect(sparkle).toBeTruthy();
      expect(sparkle.style.position).toBe('absolute');
    });

    test('should remove sparkle after 500ms', (done) => {
      const element = document.createElement('div');
      element.getBoundingClientRect = () => ({ left: 100, top: 100, width: 50, height: 50 });

      createSparkle(element);

      expect(document.querySelector('.sparkle')).toBeTruthy();

      setTimeout(() => {
        expect(document.querySelector('.sparkle')).toBeFalsy();
        done();
      }, 600);
    });
  });

  describe('showCelebration function', () => {
    test('should create celebration message', () => {
      showCelebration();

      const celebration = document.querySelector('div[style*="position: fixed"]');
      expect(celebration).toBeTruthy();
      expect(celebration.textContent).toContain('Great job! You found all the eggs!');
    });

    test('should remove celebration after 3 seconds', (done) => {
      showCelebration();

      expect(document.querySelector('div[style*="position: fixed"]')).toBeTruthy();

      setTimeout(() => {
        expect(document.querySelector('div[style*="position: fixed"]')).toBeFalsy();
        done();
      }, 3100);
    });
  });

  describe('Audio Functions', () => {
    test('playPageSound should create audio context and play sound', () => {
      const mockOscillator = {
        connect: jest.fn(),
        frequency: { value: 0, setValueAtTime: jest.fn(), exponentialRampToValueAtTime: jest.fn() },
        type: 'sine',
        start: jest.fn(),
        stop: jest.fn()
      };

      const mockGainNode = {
        connect: jest.fn(),
        gain: { setValueAtTime: jest.fn(), exponentialRampToValueAtTime: jest.fn() }
      };

      const mockAudioContext = {
        createOscillator: jest.fn(() => mockOscillator),
        createGain: jest.fn(() => mockGainNode),
        destination: {},
        currentTime: 0
      };

      global.AudioContext = jest.fn(() => mockAudioContext);

      playPageSound();

      expect(mockAudioContext.createOscillator).toHaveBeenCalled();
      expect(mockOscillator.start).toHaveBeenCalled();
      expect(mockOscillator.stop).toHaveBeenCalled();
    });

    test('playCollectSound should create audio context with correct frequency', () => {
      const mockOscillator = {
        connect: jest.fn(),
        frequency: { value: 0, setValueAtTime: jest.fn(), exponentialRampToValueAtTime: jest.fn() },
        type: 'sine',
        start: jest.fn(),
        stop: jest.fn()
      };

      const mockGainNode = {
        connect: jest.fn(),
        gain: { setValueAtTime: jest.fn(), exponentialRampToValueAtTime: jest.fn() }
      };

      const mockAudioContext = {
        createOscillator: jest.fn(() => mockOscillator),
        createGain: jest.fn(() => mockGainNode),
        destination: {},
        currentTime: 0
      };

      global.AudioContext = jest.fn(() => mockAudioContext);

      playCollectSound();

      expect(mockOscillator.frequency.setValueAtTime).toHaveBeenCalledWith(523, 0);
      expect(mockOscillator.frequency.exponentialRampToValueAtTime).toHaveBeenCalledWith(1047, 0.1);
    });
  });

  describe('DOM Content Loaded', () => {
    test('should initialize page 1 on load', () => {
      // Trigger DOMContentLoaded event
      document.dispatchEvent(new Event('DOMContentLoaded'));

      expect(document.getElementById('page-1').classList.contains('active')).toBe(true);
    });
  });
});