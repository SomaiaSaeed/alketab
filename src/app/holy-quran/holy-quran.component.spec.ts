import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HolyQuranComponent } from './holy-quran.component';

describe('HolyQuranComponent', () => {
  let component: HolyQuranComponent;
  let fixture: ComponentFixture<HolyQuranComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HolyQuranComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HolyQuranComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
