import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainroutingStudentComponent } from './mainrouting-student.component';

describe('MainroutingStudentComponent', () => {
  let component: MainroutingStudentComponent;
  let fixture: ComponentFixture<MainroutingStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainroutingStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainroutingStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
