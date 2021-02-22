import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { EmployeeBenifitsService } from '../../providers/employee-benifits.service';

import { DashboardStatsComponent } from './dashboard-stats.component';

describe('DashboardStatsComponent', () => {
  let component: DashboardStatsComponent;
  let fixture: ComponentFixture<DashboardStatsComponent>;
  let httpClientSpy: { get: jasmine.Spy };
  let employeeBenifitsService: EmployeeBenifitsService;

  beforeEach(async () => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    employeeBenifitsService = new EmployeeBenifitsService(httpClientSpy as any);
    spyOn(employeeBenifitsService, 'getEBDashboardCardsData').and.returnValue(of([]));
    
    await TestBed.configureTestingModule({
      declarations: [ DashboardStatsComponent ],
      providers: [{provide:EmployeeBenifitsService, useValue: employeeBenifitsService }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
