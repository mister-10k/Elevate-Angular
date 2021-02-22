import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppConstants } from 'src/app/shared/AppConstants';
import { IPrimeNGBarChartModel, ITable } from 'src/app/shared/models/shared.model';
import { EmployeeBenifits } from '../constants/employeeBenifits';
import { EBDashbaordStatsCardModel, IEBEmployeeList, IEBEmployeeListRequestModel, IEmployeeModel, IEmployeeModelFormMasterData } from '../models/employeeBenifits.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeBenifitsService {

  reloadDashboard$ = new BehaviorSubject<boolean>(false);

  public reloadDashboard() {
    this.reloadDashboard$.next(true);
  }

  constructor(private http: HttpClient) { }

  createEmployee(employee: IEmployeeModel): Observable<IEmployeeModel> {
    return this.http.post<IEmployeeModel>(AppConstants.employeeUrl, employee);
  }

  updateEmployee(employee: IEmployeeModel): Observable<IEmployeeModel> {
    return this.http.patch<IEmployeeModel>(AppConstants.employeeUrl, employee);
  }

  deleteEmployee(employeeId:number): Observable<IEmployeeModel> {
    return this.http.delete<IEmployeeModel>(AppConstants.employeeUrl + employeeId);
  }

  getEBDashboardCardsData(companyId: number): Observable<Array<EBDashbaordStatsCardModel>> {
    return this.http.get<Array<EBDashbaordStatsCardModel>>(AppConstants.employeeUrl + 'getebdashboardcardsdata/' + companyId);
  }

  getTop10HighestEmployeeDedcutions(companyId: number): Observable<IPrimeNGBarChartModel> {
    return this.http.get<IPrimeNGBarChartModel>(AppConstants.employeeUrl + 'GetTop10HighestEmployeeDedcutions/' + companyId);
  }

  getEmployeesForEBDashboard(requestModel: IEBEmployeeListRequestModel): Observable<ITable> {
    return this.http.post<ITable>(AppConstants.employeeUrl + 'GetEmployeesForEBDashboard', requestModel);
  }

  getEmployeeFormMasterData(): Observable<IEmployeeModelFormMasterData> {
    return this.http.get<IEmployeeModelFormMasterData>(AppConstants.employeeUrl + 'GetEmployeeFormMasterData');
  }

  public getEmployeeDeductionCost(employee: IEmployeeModel) {
    let total = 0.0;
    if (employee) {
      let employeeCost = EmployeeBenifits.CostOfEmployeeBenifits;
      if (employee.FirstName.toUpperCase().startsWith("A") )
      {
          employeeCost = employeeCost - (employeeCost * EmployeeBenifits.NameStartsWithADiscount);
      }
      total += employeeCost;
  
      if (employee.Dependents) {
        employee.Dependents.forEach(dependent => {
          let dependentCost = EmployeeBenifits.CostOfDependent;
          if (dependent.FirstName.toUpperCase().startsWith("A"))
          {
              dependentCost = dependentCost - (dependentCost * EmployeeBenifits.NameStartsWithADiscount);
          }
          total += dependentCost;
         });
      }
    }


    return total;
  }
}
