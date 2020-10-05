import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainroutingAdminComponent } from './mainrouting-admin.component';

describe('MainroutingAdminComponent', () => {
  let component: MainroutingAdminComponent;
  let fixture: ComponentFixture<MainroutingAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainroutingAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainroutingAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
