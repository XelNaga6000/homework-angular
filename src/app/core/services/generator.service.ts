import { Injectable, InjectionToken } from '@angular/core';

export const generatedString = new InjectionToken<string>('Generator');

@Injectable()
export class GeneratorService {
  private characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  generate(n: number): string {
    let result = '';

    for (let i = 0; i < n; i++) {
      const charRandomPosition = Math.floor(Math.random() * this.characters.length);
      result += this.characters.charAt(charRandomPosition);
    }

    return result;
  }

  constructor() { }
}

export function GeneratorFactory(n: number): (service: GeneratorService) => string {
  return (service: GeneratorService): string => service.generate(n);
}
