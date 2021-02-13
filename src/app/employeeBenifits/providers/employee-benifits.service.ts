import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from 'src/app/shared/AppConstants';
import { ITable } from 'src/app/shared/models/shared.model';
import { EmployeeBenifits } from '../constants/employeeBenifits';
import { IEBEmployeeList, IEBEmployeeListRequestModel, IEmployee, IEmployeeFormMasterData } from '../models/employeeBenifits.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeBenifitsService {

  constructor(private http: HttpClient) { }

  createEmployee(employee: IEmployee): Observable<IEmployee> {
    return this.http.post<IEmployee>(AppConstants.employeeUrl, employee);
  }

  deleteEmployee(employeeId:number): Observable<IEmployee> {
    return this.http.delete<IEmployee>(AppConstants.employeeUrl + employeeId);
  }

  getEmployeesForEBDashboard(requestModel: IEBEmployeeListRequestModel): Observable<ITable> {
    return this.http.post<ITable>(AppConstants.employeeUrl + 'GetEmployeesForEBDashboard', requestModel);
  }

  getEmployeeFormMasterData(): Observable<IEmployeeFormMasterData> {
    return this.http.get<IEmployeeFormMasterData>(AppConstants.employeeUrl + 'GetEmployeeFormMasterData');
  }

  public getEmployeeDeductionCost(employee: IEmployee) {
    let total = 0.0;
    let employeeCost = EmployeeBenifits.CostOfEmployeeBenifits;
    if (employee.FirstName.toUpperCase().startsWith("A") )
    {
        employeeCost = employeeCost - (employeeCost * EmployeeBenifits.NameStartsWithADiscount);
    }
    total += employeeCost;

    employee.Dependents.forEach(dependent => {
        let dependentCost = EmployeeBenifits.CostOfDependent;
        if (dependent.FirstName.toUpperCase().startsWith("A"))
        {
            dependentCost = dependentCost - (dependentCost * EmployeeBenifits.NameStartsWithADiscount);
        }
        total += dependentCost;
    });

    return total;
  }
}
