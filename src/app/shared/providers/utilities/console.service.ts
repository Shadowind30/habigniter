import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsoleService {
  log(message?: any, ...optionalParams: any[]): void {
    if (environment.production) return;
    console.log(message, ...optionalParams);
  }

  error(message?: any, ...optionalParams: any[]): void {
    if (environment.production) return;
    console.error(message, ...optionalParams);
  }

  warn(message?: any, ...optionalParams: any[]): void {
    if (environment.production) return;
    console.warn(message, ...optionalParams);
  }

  info(message?: any, ...optionalParams: any[]): void {
    if (environment.production) return;
    console.info(message, ...optionalParams);
  }
}
