import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomeformComponent } from './customeform.component';

describe('CustomeformComponent', () => {
  let component: CustomeformComponent;
  let fixture: ComponentFixture<CustomeformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomeformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomeformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
