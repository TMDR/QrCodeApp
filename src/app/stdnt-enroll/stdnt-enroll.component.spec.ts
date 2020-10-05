import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StdntEnrollComponent } from './stdnt-enroll.component';

describe('StdntEnrollComponent', () => {
  let component: StdntEnrollComponent;
  let fixture: ComponentFixture<StdntEnrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StdntEnrollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StdntEnrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
