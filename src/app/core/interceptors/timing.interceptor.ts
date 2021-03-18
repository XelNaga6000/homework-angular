import {Injectable} from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpParams, HttpEventType } from '@angular/common/http';

import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable()
export class TimingInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // request interceptor
    let requestTs = 0;
    if (req.url.includes('products')) {
      requestTs = Date.now();
    }

    // response interceptor
    return next.handle(req).pipe(
      filter((event: HttpEvent<any>) => event.type === HttpEventType.Response),
      map((event: HttpResponse<any>) => {
        if (event.url.includes('products')) {
          console.log(`TimingInterceptor: ${event.url} - ${Date.now() - requestTs}ms`);
        }
        return event;
      })
    );

  }
}
