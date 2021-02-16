import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighestEmployeeDeductionsComponent } from './highest-employee-deductions.component';

describe('HighestEmployeeDeductionsComponent', () => {
  let component: HighestEmployeeDeductionsComponent;
  let fixture: ComponentFixture<HighestEmployeeDeductionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HighestEmployeeDeductionsComponent ]
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
