import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { EmployeeBenifitsService } from './employee-benifits.service';

describe('EmployeeBenifitsService', () => {
  let service: EmployeeBenifitsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(EmployeeBenifitsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
