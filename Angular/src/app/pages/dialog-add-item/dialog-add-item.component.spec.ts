import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddItemComponent } from './dialog-add-item.component';

describe('DialogAddItemComponent', () => {
  let component: DialogAddItemComponent;
  let fixture: ComponentFixture<DialogAddItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
