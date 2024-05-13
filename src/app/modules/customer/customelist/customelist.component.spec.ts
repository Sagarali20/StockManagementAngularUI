import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomelistComponent } from './customelist.component';

describe('CustomelistComponent', () => {
  let component: CustomelistComponent;
  let fixture: ComponentFixture<CustomelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomelistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
