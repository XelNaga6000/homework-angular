import { Inject, Injectable, InjectionToken } from '@angular/core';

export const localStorageKeyToken = new InjectionToken<string>('KeyToken');

@Injectable()
export class LocalStorageService {
  // i'm not sure why do we need useValue in this task, so i'm using it for key
  // (even if it is stupid from practical point of view)
  // Сегодня я объяснил ситуацию, надеюсь понятна цель задания.
  constructor(
    @Inject(localStorageKeyToken) private key: string) { }

  getValue(): any {
    return localStorage.getItem(this.key);
  }

  setValue(value: any): void {
    localStorage.setItem(this.key, value);
  }
}
