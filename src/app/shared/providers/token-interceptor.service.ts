import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage.getItem('jwtToken')) {
      return next.handle(req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + localStorage.getItem('jwtToken')
        }
      }));
    }

    return next.handle(req);
  }
}
