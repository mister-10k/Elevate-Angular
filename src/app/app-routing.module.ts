import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeBenifitsDashboardComponent } from './employeeBenifits/components/employee-benifits-dashboard/employee-benifits-dashboard.component';
import { CanActivateLogin } from './shared/providers/can-activate-login.service';
import { HomeComponent } from './user/components/home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'employeeBenifits/Dashboard', component: EmployeeBenifitsDashboardComponent, canActivate: [CanActivateLogin]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
