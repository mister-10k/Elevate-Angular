import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from 'src/app/shared/AppConstants';
import { IEBEmployeeList, IEBEmployeeListRequestModel, IEmployee } from '../models/employeeBenifits.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeBenifitsService {

  constructor(private http: HttpClient) { }

  deleteEmployee(employeeId:number): Observable<IEmployee> {
    return this.http.delete<IEmployee>(AppConstants.employeeUrl + employeeId);
  }

  getEmployeesForEBDashboard(requestModel: IEBEmployeeListRequestModel): Observable<Array<IEBEmployeeList>> {
    return this.http.post<Array<IEBEmployeeList>>(AppConstants.employeeUrl + 'GetEmployeesForEBDashboard', requestModel);
  }
}
