import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/user/providers/user.service';
import { EmployeeBenifitsService } from '../../providers/employee-benifits.service';
import { EmployeeDialog } from './employee-dialog.component';

const dialogMock = {
  close: () => { }
};

describe('EmployeeDialog', () => {
  let component: EmployeeDialog;
  let fixture: ComponentFixture<EmployeeDialog>;
  let httpClientSpy: { get: jasmine.Spy };
  let employeeBenifitsService: EmployeeBenifitsService;
  let userService: UserService;

  beforeEach(async () => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    employeeBenifitsService = new EmployeeBenifitsService(httpClientSpy as any);
    userService = new UserService(httpClientSpy as any);

    await TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [ EmployeeDialog ],
      providers: [
        { provide: UserService, useValue: userService }, 
        { provide: EmployeeBenifitsService, useValue: employeeBenifitsService }, 
        { provide: MatDialogRef, useValue: dialogMock },
        { provide: MAT_DIALOG_DATA, useValue: [] }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
