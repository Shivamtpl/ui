import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRooms } from './my-rooms';

describe('MyRooms', () => {
  let component: MyRooms;
  let fixture: ComponentFixture<MyRooms>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyRooms],
    }).compileComponents();

    fixture = TestBed.createComponent(MyRooms);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
