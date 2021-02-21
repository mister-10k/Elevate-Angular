import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { IEmployeeModelFormMasterData } from '../../models/employeeBenifits.model';
import { EmployeeBenifitsService } from '../../providers/employee-benifits.service';

@Component({
  selector: 'app-employee-benifits-dashboard',
  templateUrl: './employee-benifits-dashboard.component.html',
  styleUrls: ['./employee-benifits-dashboard.component.scss']
})
export class EmployeeBenifitsDashboardComponent implements OnInit {

  employeeFormMasterData: IEmployeeModelFormMasterData;

  constructor(private employeeBenifitsService: EmployeeBenifitsService) { }

  ngOnInit(): void {
    const obs = this.employeeBenifitsService.getEmployeeFormMasterData();
    obs.pipe(take(1)).subscribe(data => {
      if (data) {
        this.employeeFormMasterData = data;
      } else {
        this.employeeFormMasterData = { Relationships: [] };
      }  
    }, err => console.log(err));
  }

}
