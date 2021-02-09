import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeBenifitsDashboardComponent } from './components/employee-benifits-dashboard/employee-benifits-dashboard.component';
import { DashboardStatsComponent } from './components/dashboard-stats/dashboard-stats.component';
import { DashboardStatCardComponent } from './components/dashboard-stats/dashboard-stat-card/dashboard-stat-card.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { MaterialModule } from '../shared/material.module';
import { SharedModule } from '../shared/shared.module';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { EmployeeDialog } from './components/employee-dialog/employee-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  entryComponents: [EmployeeDialog],
  declarations: [EmployeeBenifitsDashboardComponent, DashboardStatsComponent, DashboardStatCardComponent, EmployeeListComponent, EmployeeDialog],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
  ]
})
export class EmployeeBenifitsModule { }
