import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveDialog } from './remove-dialog.component';

describe('RemoveDialog', () => {
  let component: RemoveDialog;
  let fixture: ComponentFixture<RemoveDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveDialog ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
