import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from 'src/app/shared/AppConstants';
import { ISignUpMasterDataModel, IUserModel } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

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
}
