import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XerrorComponent } from './xerror.component';

describe('XerrorComponent', () => {
  let component: XerrorComponent;
  let fixture: ComponentFixture<XerrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ XerrorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XerrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
