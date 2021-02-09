import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardStatCardComponent } from './dashboard-stat-card.component';

describe('DashboardStatCardComponent', () => {
  let component: DashboardStatCardComponent;
  let fixture: ComponentFixture<DashboardStatCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardStatCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardStatCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
