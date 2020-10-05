import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StdntGradesComponent } from './stdnt-grades.component';

describe('StdntGradesComponent', () => {
  let component: StdntGradesComponent;
  let fixture: ComponentFixture<StdntGradesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StdntGradesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StdntGradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
