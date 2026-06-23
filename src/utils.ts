/**
 * Safe local storage wrapper to prevent crashes in iframe sandbox environments.
 */

// In-memory fallback representation for when localStorage throws or is not available
const memoryStorage: Record<string, string> = {};

export const safeStorage = {
  getItem(key: string): string | null {
    try {
      return window.localStorage.getItem(key);
    } catch (e) {
      console.warn('localStorage is blocked or unavailable; using memory storage. Error:', e);
      return memoryStorage[key] || null;
    }
  },

  setItem(key: string, value: string): void {
    try {
      window.localStorage.setItem(key, value);
    } catch (e) {
      console.warn('localStorage is blocked or unavailable; using memory storage. Error:', e);
      memoryStorage[key] = value;
    }
  },

  removeItem(key: string): void {
    try {
      window.localStorage.removeItem(key);
    } catch (e) {
      console.warn('localStorage is blocked or unavailable; using memory storage. Error:', e);
      delete memoryStorage[key];
    }
  }
};
