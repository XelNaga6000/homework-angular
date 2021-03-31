import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// rxjs
import { Observable, of } from 'rxjs';
import { catchError, retry, tap, map } from 'rxjs/operators';
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
        map((assetsSettings) => {
          if (!assetsSettings) {
            console.log('AppSettingsService: app-settings.json corrupted, reading defaults', this.defaultSettings);
            return this.defaultSettings;
          }

          console.log('AppSettingsService: app-settings.json found', assetsSettings);
          return assetsSettings;
        }),
        tap((assetsSettings) => {
          console.log('AppSettingsService: saving settings to localStorage', assetsSettings);
          this.localStorageService.setValue('app-settings', JSON.stringify(assetsSettings));
        }),
        catchError((e) => {
          console.log('AppSettingsService: Error on getting settings', e, 'Reading defaults', this.defaultSettings);
          this.localStorageService.setValue('app-settings', JSON.stringify(this.defaultSettings));
          return of(this.defaultSettings);
        })
      );
    }
  }
}
