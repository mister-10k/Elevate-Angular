import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject, Observable } from 'rxjs';
import { IPrimeNGBarChartModel } from 'src/app/shared/models/shared.model';
import { EmployeeBenifitsService } from '../../providers/employee-benifits.service';
import { HighestEmployeeDeductionsComponent } from './highest-employee-deductions.component';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

class MockEmployeeBenifitsService {
  reloadDashboard$ = new BehaviorSubject<boolean>(false);
  getTop10HighestEmployeeDedcutions(companyId: number): Observable<IPrimeNGBarChartModel> {
    return of<IPrimeNGBarChartModel>({ labels: [], datasets: [] });
  }
}

describe('HighestEmployeeDeductionsComponent', () => {
  let component: HighestEmployeeDeductionsComponent;
  let fixture: ComponentFixture<HighestEmployeeDeductionsComponent>;
  let httpClientSpy: { get: jasmine.Spy };
  let employeeBenifitsService: EmployeeBenifitsService;

  beforeEach(async () => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    employeeBenifitsService = new EmployeeBenifitsService(httpClientSpy as any);
    
    await TestBed.configureTestingModule({
      declarations: [ HighestEmployeeDeductionsComponent ],
      providers: [{provide:EmployeeBenifitsService, useValue: employeeBenifitsService }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HighestEmployeeDeductionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
