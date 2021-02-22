import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { EmployeeBenifitsService } from '../../providers/employee-benifits.service';
import { EmployeeListComponent } from './employee-list.component';


describe('EmployeeListComponent', () => {
  let component: EmployeeListComponent;
  let fixture: ComponentFixture<EmployeeListComponent>;
  let httpClientSpy: { get: jasmine.Spy };
  let employeeBenifitsService: EmployeeBenifitsService;
  let httpMock: HttpTestingController;
  let employee;

  beforeEach(async () => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    employeeBenifitsService = new EmployeeBenifitsService(httpClientSpy as any);
    employee = { 
      Id: 1,
      FirstName: "Ashley",
      LastName: "Ohemeng",
      Dependents: [],
      CreatedAt: "02/21/2021" 
    };

    spyOn(employeeBenifitsService, 'getEmployeesForEBDashboard').and.returnValue(of({ Rows: [], TotalCount: 0 }));
    spyOn(employeeBenifitsService, 'createEmployee').and.returnValue(of(employee));
    spyOn(employeeBenifitsService, 'updateEmployee').and.returnValue(of(employee));
    spyOn(employeeBenifitsService, 'deleteEmployee').and.returnValue(of(employee));
    
    await TestBed.configureTestingModule({
      imports: [MatDialogModule, MatSnackBarModule, MatPaginatorModule, BrowserAnimationsModule, RouterTestingModule, HttpClientTestingModule ],
      declarations: [ EmployeeListComponent],
      providers: [
        { provide: EmployeeBenifitsService, useValue: employeeBenifitsService },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ]
    })
    .compileComponents();

    httpMock = TestBed.get(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('createEmployee should get an employee back on success', () => {
    employeeBenifitsService.createEmployee(employee).subscribe((res) => {
      expect(res).toEqual(employee);
    });
  });

  it('updateEmployee should get an employee back on success', () => {
    employeeBenifitsService.updateEmployee(employee).subscribe((res) => {
      expect(res).toEqual(employee);
    });
  });

  it('deleteEmployee should get an employee back on success', () => {
    employeeBenifitsService.deleteEmployee(1).subscribe((res) => {
      expect(res).toEqual(employee);
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
