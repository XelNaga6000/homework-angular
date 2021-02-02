import { Injectable } from '@angular/core';
import { Config } from '../shared/config.interface';

@Injectable({
  providedIn: 'root'
})
export class ConfigOptionsService {
  private configOptions: Config = {};

  constructor() { }

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
