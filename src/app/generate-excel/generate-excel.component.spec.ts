import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateEXCELComponent } from './generate-excel.component';

describe('GenerateEXCELComponent', () => {
  let component: GenerateEXCELComponent;
  let fixture: ComponentFixture<GenerateEXCELComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateEXCELComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateEXCELComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
