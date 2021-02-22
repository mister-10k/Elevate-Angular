import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AppConstants } from 'src/app/shared/AppConstants';
import { ISignUpMasterDataModel, IUserModel } from '../models/user.model';
import * as bcrypt from 'bcryptjs'


@Injectable({
  providedIn: 'root'
})
export class UserService {

  public sessionExpired$: Subject<boolean> = new Subject();

  constructor(private http: HttpClient) { }

  public sessionExpired() {
    this.sessionExpired$.next(true);
  }

  login(email: string, password: string): Observable<string> {
    return this.http.post<string>(AppConstants.userUrl + 'login', {  Email: email, Password: password });
  }

  signUp(userModel: IUserModel) {
    return this.http.post<string>(AppConstants.userUrl + 'signUp', userModel);
  }

  getSignUpMasterData(): Observable<ISignUpMasterDataModel> {
    return this.http.get<ISignUpMasterDataModel>(AppConstants.userUrl + 'getSignUpMasterData');
  }

  userAlreadyHasEmail(email: string): Observable<boolean>{
    return this.http.post<boolean>(AppConstants.userUrl + 'userAlreadyHasEmail', { Email: email});
  }

  logout(): void {
    localStorage.removeItem('jwtToken');
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('jwtToken') !== null);
  }

  hashPassword(password: string): string {
    var salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }
}
