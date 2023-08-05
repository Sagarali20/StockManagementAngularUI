import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboarduiComponent } from './dashboardui.component';

describe('DashboarduiComponent', () => {
  let component: DashboarduiComponent;
  let fixture: ComponentFixture<DashboarduiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboarduiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboarduiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
