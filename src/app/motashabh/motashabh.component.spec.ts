import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MotashabhComponent } from './motashabh.component';

describe('MotashabhComponent', () => {
  let component: MotashabhComponent;
  let fixture: ComponentFixture<MotashabhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MotashabhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MotashabhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
