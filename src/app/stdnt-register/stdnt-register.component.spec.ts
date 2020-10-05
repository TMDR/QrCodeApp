import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StdntRegisterComponent } from './stdnt-register.component';

describe('StdntRegisterComponent', () => {
  let component: StdntRegisterComponent;
  let fixture: ComponentFixture<StdntRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StdntRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StdntRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
