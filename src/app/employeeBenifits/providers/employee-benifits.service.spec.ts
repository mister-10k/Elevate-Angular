import { TestBed } from '@angular/core/testing';

import { EmployeeBenifitsService } from './employee-benifits.service';

describe('EmployeeBenifitsService', () => {
  let service: EmployeeBenifitsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeBenifitsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
