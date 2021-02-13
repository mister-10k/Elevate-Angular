import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { IEmployeeFormMasterData } from '../../models/employeeBenifits.model';
import { EmployeeBenifitsService } from '../../providers/employee-benifits.service';

@Component({
  selector: 'app-employee-benifits-dashboard',
  templateUrl: './employee-benifits-dashboard.component.html',
  styleUrls: ['./employee-benifits-dashboard.component.scss']
})
export class EmployeeBenifitsDashboardComponent implements OnInit {

  employeeFormMasterData: IEmployeeFormMasterData;

  constructor(private employeeBenifitsService: EmployeeBenifitsService) { }

  ngOnInit(): void {
    const obs = this.employeeBenifitsService.getEmployeeFormMasterData();
    obs.pipe(take(1)).subscribe(data => {
      this.employeeFormMasterData = data;
    }, err => console.log(err));
  }

}
