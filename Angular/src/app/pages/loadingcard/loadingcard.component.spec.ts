import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingcardComponent } from './loadingcard.component';

describe('LoadingcardComponent', () => {
  let component: LoadingcardComponent;
  let fixture: ComponentFixture<LoadingcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadingcardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
