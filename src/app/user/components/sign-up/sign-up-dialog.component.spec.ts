import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { EmployeeBenifitsService } from 'src/app/employeeBenifits/providers/employee-benifits.service';

import { SignUpDialog } from './sign-up-dialog.component';


describe('SignUpDialog', () => {
  let component: SignUpDialog;
  let fixture: ComponentFixture<SignUpDialog>;
  let httpClientSpy: { get: jasmine.Spy };
  let employeeBenifitsService: EmployeeBenifitsService;

  beforeEach(async () => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    employeeBenifitsService = new EmployeeBenifitsService(httpClientSpy as any);

    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RouterTestingModule],
      declarations: [ SignUpDialog ],
      providers: [
        { provide: EmployeeBenifitsService, useValue: employeeBenifitsService }, 
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
