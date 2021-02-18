import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpDialog } from './sign-up-dialog.component';

describe('SignUpDialog', () => {
  let component: SignUpDialog;
  let fixture: ComponentFixture<SignUpDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignUpDialog ]
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
