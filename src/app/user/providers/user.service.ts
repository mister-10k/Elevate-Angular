import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from 'src/app/shared/AppConstants';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<string> {
    // return this.http.post<string>(AppConstants.userUrl + 'login', {
    //   usernameOrEmail: email,
    //   password: password
    // });
    return Observable.create(function(observer:any) {
      observer.next(AppConstants.JWT);
      observer.complete();
    });
  }

  logout(): void {
    localStorage.removeItem('jwtToken');
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('jwtToken') !== null);
  }
}
