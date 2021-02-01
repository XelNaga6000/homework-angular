import { Injectable } from '@angular/core';
import { Config } from '../models/config.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigOptionsService {
  constructor(private configOptions: Config = {}) { }

  getConfig(): Config {
    return this.configOptions;
  }

  // not sure that I understood requirements for task 3.2
  setConfig(config: Config): void {
    this.configOptions = {
      ...this.configOptions,
      ...config
    };
  }
}
