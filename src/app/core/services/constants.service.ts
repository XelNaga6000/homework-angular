import { InjectionToken } from '@angular/core';
import { Constants } from '../shared/constants.interface';

export const constantsToken = new InjectionToken<Constants>('Constants');

export const constantsInstance: Constants = { app: 'TaskManager', ver: '1.0' };
