import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeBenifitsDashboardComponent } from './employee-benifits-dashboard.component';

describe('EmployeeBenifitsDashboardComponent', () => {
  let component: EmployeeBenifitsDashboardComponent;
  let fixture: ComponentFixture<EmployeeBenifitsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeBenifitsDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeBenifitsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
