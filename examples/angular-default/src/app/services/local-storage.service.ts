import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  setData(key: string, value: string) {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.error('Error setting in localStorage');
    }
  }

  getData(key: string): string | null {
    let value = null;

    try {
      value = localStorage.getItem(key);
    } catch (e) {
      console.error('Error getting from localStorage');
    }

    return value;
  }

  removeData(key: string) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error('Error removing from localStorage');
    }
  }

  clearData() {
    try {
      localStorage.clear();
    } catch (e) {
      console.error('Error clearing localStorage');
    }
  }
}
