import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QoraaComponent } from './qoraa.component';

describe('QoraaComponent', () => {
  let component: QoraaComponent;
  let fixture: ComponentFixture<QoraaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QoraaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QoraaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
