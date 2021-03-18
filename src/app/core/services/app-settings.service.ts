import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// rxjs
import { Observable, of } from 'rxjs';
import { catchError, retry, share, tap } from 'rxjs/operators';
import { AppSettings } from '../interfaces/app-settings.interface';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AppSettingsService {
  private defaultSettings: AppSettings = {
    appName: 'BoozeMart'
  };

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  getSettings(): Observable<AppSettings> {
    const localStorageSettings = this.localStorageService.getValue('app-settings');

    if (localStorageSettings) {
      console.log('AppSettingsService: Local settings found', localStorageSettings);
      return of(JSON.parse(localStorageSettings));
    } else {
      return this.http.get<AppSettings>('assets/app-settings.json').pipe(
        retry(2),
        tap((assetsSettings) => {
          console.log('AppSettingsService: app-settings.json found', assetsSettings);
          this.localStorageService.setValue('app-settings', JSON.stringify(assetsSettings));
        }),
        catchError(() => {
          console.log('AppSettingsService: app-settings.json not found, reading defaults', this.defaultSettings);
          this.localStorageService.setValue('app-settings', JSON.stringify(this.defaultSettings));
          return of(this.defaultSettings);
        })
      );
    }
  }
}
