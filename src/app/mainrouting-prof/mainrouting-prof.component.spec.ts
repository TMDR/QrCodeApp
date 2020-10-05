import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainroutingPROFComponent } from './mainrouting-prof.component';

describe('MainroutingPROFComponent', () => {
  let component: MainroutingPROFComponent;
  let fixture: ComponentFixture<MainroutingPROFComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainroutingPROFComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainroutingPROFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
