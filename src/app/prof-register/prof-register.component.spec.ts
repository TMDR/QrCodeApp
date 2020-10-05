import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfRegisterComponent } from './prof-register.component';

describe('ProfRegisterComponent', () => {
  let component: ProfRegisterComponent;
  let fixture: ComponentFixture<ProfRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
