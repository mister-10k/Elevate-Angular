import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { EmployeeBenifitsService } from '../../providers/employee-benifits.service';
import { EmployeeListComponent } from './employee-list.component';


describe('EmployeeListComponent', () => {
  let component: EmployeeListComponent;
  let fixture: ComponentFixture<EmployeeListComponent>;
  let httpClientSpy: { get: jasmine.Spy };
  let employeeBenifitsService: EmployeeBenifitsService;

  beforeEach(async () => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    employeeBenifitsService = new EmployeeBenifitsService(httpClientSpy as any);
    
    await TestBed.configureTestingModule({
      imports: [MatDialogModule, MatSnackBarModule, MatPaginatorModule, BrowserAnimationsModule, RouterTestingModule],
      declarations: [ EmployeeListComponent],
      providers: [
        { provide: EmployeeBenifitsService, useValue: employeeBenifitsService },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
