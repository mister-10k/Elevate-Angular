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

  it('getEmployeeDeductionCost with an employee with a name that doesn\'t start with "a" and no dependents should return $1000', () => {
    let deduction = service.getEmployeeDeductionCost({
      Id: 1,
      FirstName: "Kwabena",
      LastName: "Ohemeng",
      Dependents: [],
      CreatedAt: "02/21/2021"
    });
    expect(deduction).toEqual(1000);
  });

  it('getEmployeeDeductionCost with an employee with a name that start with "a" and no dependents should return $900', () => {
    let deduction = service.getEmployeeDeductionCost({
      Id: 1,
      FirstName: "Ashley",
      LastName: "Ohemeng",
      Dependents: [],
      CreatedAt: "02/21/2021"
    });
    expect(deduction).toEqual(900);
  });

  it('getEmployeeDeductionCost with an employee with a name that doesn\'t start with "a" and one dependent with a name that doesn\'t start with "A" should return $1500', () => {
    let deduction = service.getEmployeeDeductionCost({
      Id: 1,
      FirstName: "Kwabena",
      LastName: "Ohemeng",
      Dependents: [
        { Id: 1, EmployeeId: 1, FirstName: "Bob", LastName: "Ohemeng", RelationshipId: 1 }
      ],
      CreatedAt: "02/21/2021"
    });
    expect(deduction).toEqual(1500);
  });

  it('getEmployeeDeductionCost with an employee with a name that starts with "a" and one dependent with a name that starts with "A" should return $1350', () => {
    let deduction = service.getEmployeeDeductionCost({
      Id: 1,
      FirstName: "Ashley",
      LastName: "Ohemeng",
      Dependents: [
        { Id: 1, EmployeeId: 1, FirstName: "Adam", LastName: "Ohemeng", RelationshipId: 1 }
      ],
      CreatedAt: "02/21/2021"
    });
    expect(deduction).toEqual(1350);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
