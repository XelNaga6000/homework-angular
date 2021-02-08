import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {
  constructor(
    private defaultGetValue: string = null
  ) { }

  getValue(key: string): string {
    console.log(`Reading ${key} value`);
    const value = localStorage.getItem(key);

    if (this.defaultGetValue && !value) {
      console.log(
        `Could not readt value from ${key}.
        Default value used: ${this.defaultGetValue}`
      );
      return this.defaultGetValue;
    }

    return value;
  }

  setValue(key: string, value: any): void {
    console.log(`Saving ${value} in ${key}`);
    localStorage.setItem(key, value);
  }
}

export const localStorageInstance = new LocalStorageService();
export const localStorageSafeInstance = new LocalStorageService('No value found');
