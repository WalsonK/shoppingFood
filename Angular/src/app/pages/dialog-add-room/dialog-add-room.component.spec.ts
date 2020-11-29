import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddRoomComponent } from './dialog-add-room.component';

describe('DialogAddRoomComponent', () => {
  let component: DialogAddRoomComponent;
  let fixture: ComponentFixture<DialogAddRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddRoomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
