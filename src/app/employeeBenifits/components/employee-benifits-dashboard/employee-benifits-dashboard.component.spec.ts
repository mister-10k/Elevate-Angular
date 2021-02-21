import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { EmployeeBenifitsService } from '../../providers/employee-benifits.service';

import { EmployeeBenifitsDashboardComponent } from './employee-benifits-dashboard.component';

describe('EmployeeBenifitsDashboardComponent', () => {
  let component: EmployeeBenifitsDashboardComponent;
  let fixture: ComponentFixture<EmployeeBenifitsDashboardComponent>;
  let httpClientSpy: { get: jasmine.Spy };
  let employeeBenifitsService: EmployeeBenifitsService;

  beforeEach(async () => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    employeeBenifitsService = new EmployeeBenifitsService(httpClientSpy as any);
    spyOn(employeeBenifitsService, 'getEmployeeFormMasterData').and.returnValue(of({ Relationships: [] }));

    await TestBed.configureTestingModule({
      declarations: [ EmployeeBenifitsDashboardComponent ],
      providers: [
        { provide: EmployeeBenifitsService, useValue: employeeBenifitsService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    employeeBenifitsService = new EmployeeBenifitsService(httpClientSpy as any);

    fixture = TestBed.createComponent(EmployeeBenifitsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
