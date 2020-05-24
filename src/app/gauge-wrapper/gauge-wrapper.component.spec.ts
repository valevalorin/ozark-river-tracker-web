import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GaugeWrapperComponent } from './gauge-wrapper.component';

describe('GaugeWrapperComponent', () => {
  let component: GaugeWrapperComponent;
  let fixture: ComponentFixture<GaugeWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GaugeWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GaugeWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
