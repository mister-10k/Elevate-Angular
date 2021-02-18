import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EBDashbaordStatsCardModel } from '../../models/employeeBenifits.model';
import { EmployeeBenifitsService } from '../../providers/employee-benifits.service';
import jwt_decode from "jwt-decode";
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard-stats',
  templateUrl: './dashboard-stats.component.html',
  styleUrls: ['./dashboard-stats.component.scss']
})
export class DashboardStatsComponent implements OnInit, OnDestroy {

  reloadDashboardSub: Subscription;
  data: Array<EBDashbaordStatsCardModel>;

  constructor(private employeeBenifitsService: EmployeeBenifitsService) { }

  ngOnInit(): void {
    this.getEBDashboardCardsData();
    this.setReloadDashboardSub();
  }

  ngOnDestroy() {
    if (this.reloadDashboardSub) this.reloadDashboardSub.unsubscribe();
  }

  setReloadDashboardSub() {
    this.reloadDashboardSub = this.employeeBenifitsService.reloadDashboard$.subscribe(reload => {
      if (reload) {
        this.getEBDashboardCardsData();
      }
    }, err => console.log(err));
  }

  getEBDashboardCardsData() {
    var jwtDecoded = jwt_decode(localStorage.getItem('jwtToken')) as any;;
    const obs = this.employeeBenifitsService.getEBDashboardCardsData(jwtDecoded.companyId);
    obs.pipe(take(1)).subscribe((data) => {
      this.data = data;
    }, err => console.log(err))
  }

}
