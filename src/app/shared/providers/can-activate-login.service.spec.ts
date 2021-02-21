import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from 'src/app/user/providers/user.service';

import { CanActivateLogin } from './can-activate-login.service';

describe('CanActivateLogin', () => {
  let canActivateLogin: CanActivateLogin;
  let httpClientSpy: { get: jasmine.Spy };
  let userService: UserService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    userService = new UserService(httpClientSpy as any);

    TestBed.configureTestingModule({ 
      imports: [RouterTestingModule],
      providers: [{ provide: UserService, useValue: userService } ]
    });
    canActivateLogin = TestBed.inject(CanActivateLogin);
  });

  it('should be created', () => {
    expect(canActivateLogin).toBeTruthy();
  });
});
