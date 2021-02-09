import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDialog } from './employee-dialog.component';

describe('EmployeeDialog', () => {
  let component: EmployeeDialog;
  let fixture: ComponentFixture<EmployeeDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeDialog ]
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
