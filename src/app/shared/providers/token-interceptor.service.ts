import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { UserService } from 'src/app/user/providers/user.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor {

  constructor(private userService: UserService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.isAnonymousRoute(req.url)) {
      return next.handle(req);
    }

    if (localStorage.getItem('jwtToken')) {
      return next.handle(req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + localStorage.getItem('jwtToken')
        }
      }));
    }

    this.userService.sessionExpired();
    return EMPTY;
  }

  isAnonymousRoute(url:string): boolean {
    const lowerCaseUrl = url.toLowerCase();
    
    if (lowerCaseUrl.endsWith("login") || lowerCaseUrl.endsWith("signup") || lowerCaseUrl.endsWith("getsignupmasterdata") || 
       lowerCaseUrl.endsWith("useralreadyhasemail")) {
      return true;
    }

    return false;
  }
}
