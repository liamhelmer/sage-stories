// Jest setup file for DOM testing environment
import '@testing-library/jest-dom';

// Mock Web Audio API
global.AudioContext = jest.fn(() => ({
  createOscillator: jest.fn(() => ({
    connect: jest.fn(),
    frequency: { value: 0, setValueAtTime: jest.fn(), exponentialRampToValueAtTime: jest.fn() },
    type: 'sine',
    start: jest.fn(),
    stop: jest.fn()
  })),
  createGain: jest.fn(() => ({
    connect: jest.fn(),
    gain: {
      setValueAtTime: jest.fn(),
      exponentialRampToValueAtTime: jest.fn()
    }
  })),
  destination: {},
  currentTime: 0
}));

global.webkitAudioContext = global.AudioContext;

// Mock Speech Synthesis API
const mockSpeechSynthesis = {
  speak: jest.fn(),
  cancel: jest.fn(),
  pause: jest.fn(),
  resume: jest.fn(),
  getVoices: jest.fn(() => [
    { name: 'Test Voice', lang: 'en-US' },
    { name: 'Samantha', lang: 'en-US' }
  ]),
  onvoiceschanged: null,
  speaking: false,
  paused: false,
  pending: false
};

global.speechSynthesis = mockSpeechSynthesis;
global.SpeechSynthesisUtterance = jest.fn(function(text) {
  this.text = text;
  this.voice = null;
  this.rate = 1;
  this.pitch = 1;
  this.volume = 1;
  this.onstart = null;
  this.onend = null;
  this.onerror = null;
  this.onpause = null;
  this.onresume = null;
  this.onmark = null;
  this.onboundary = null;
});

// Mock DOM methods
global.HTMLElement.prototype.scrollIntoView = jest.fn();

// Mock requestAnimationFrame
global.requestAnimationFrame = (cb) => setTimeout(cb, 0);
global.cancelAnimationFrame = (id) => clearTimeout(id);

// Mock performance.now()
global.performance = {
  now: jest.fn(() => Date.now())
};

// Clean up after each test
afterEach(() => {
  // Clear all mocks
  jest.clearAllMocks();

  // Reset speech synthesis state
  mockSpeechSynthesis.speaking = false;
  mockSpeechSynthesis.paused = false;
  mockSpeechSynthesis.pending = false;

  // Clean up DOM
  document.body.innerHTML = '';
  document.head.innerHTML = '';
});