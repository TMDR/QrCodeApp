import { TestBed } from '@angular/core/testing';

import { ProfessorGuardService } from './professor-guard.service';

describe('ProfessorGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProfessorGuardService = TestBed.get(ProfessorGuardService);
    expect(service).toBeTruthy();
  });
});
