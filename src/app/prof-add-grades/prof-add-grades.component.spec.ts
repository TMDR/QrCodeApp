import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfAddGradesComponent } from './prof-add-grades.component';

describe('ProfAddGradesComponent', () => {
  let component: ProfAddGradesComponent;
  let fixture: ComponentFixture<ProfAddGradesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfAddGradesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfAddGradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
