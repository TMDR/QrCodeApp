import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StdntScheduleComponent } from './stdnt-schedule.component';

describe('StdntScheduleComponent', () => {
  let component: StdntScheduleComponent;
  let fixture: ComponentFixture<StdntScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StdntScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StdntScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
