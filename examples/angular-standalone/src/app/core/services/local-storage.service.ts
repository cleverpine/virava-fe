import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  setItem(key: string, value: string) {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.error('Error setting in localStorage');
    }
  }

  getItem(key: string): string | null {
    let value = null;

    try {
      value = localStorage.getItem(key);
    } catch (e) {
      console.error('Error getting from localStorage');
    }

    return value;
  }

  removeItem(key: string) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error('Error removing from localStorage');
    }
  }

  clearItems() {
    try {
      localStorage.clear();
    } catch (e) {
      console.error('Error clearing localStorage');
    }
  }
}
