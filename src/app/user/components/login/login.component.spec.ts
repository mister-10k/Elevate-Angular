import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { UserService } from '../../providers/user.service';
import { LoginComponent } from './login.component';

const dialogMock = {
  close: () => { }
};


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let httpClientSpy: { get: jasmine.Spy };
  let userService: UserService;

  beforeEach(async () => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    userService = new UserService(httpClientSpy as any);
    spyOn(userService, 'getSignUpMasterData').and.returnValue(of({ Companies: [], UserTypes: [] }));
    
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule , MatDialogModule, MatSnackBarModule],
      declarations: [ LoginComponent ],
      providers: [
        { provide: UserService, useValue: userService },
        { provide: MatDialogRef, useValue: dialogMock },
        { provide: MAT_DIALOG_DATA, useValue: [] }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
