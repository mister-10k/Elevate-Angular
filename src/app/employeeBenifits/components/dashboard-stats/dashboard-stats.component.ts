import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EmployeeBenifitsService } from '../../providers/employee-benifits.service';

@Component({
  selector: 'app-dashboard-stats',
  templateUrl: './dashboard-stats.component.html',
  styleUrls: ['./dashboard-stats.component.scss']
})
export class DashboardStatsComponent implements OnInit, OnDestroy {

  reloadDashboardSub: Subscription;

  constructor(private employeeBenifitsService: EmployeeBenifitsService) { }

  ngOnInit(): void {

  }

  ngOnDestroy() {
    if (this.reloadDashboardSub) this.reloadDashboardSub.unsubscribe();
  }

  setReloadDashboardSub() {
    this.reloadDashboardSub = this.employeeBenifitsService.reloadDashboard$.subscribe(reload => {
      if (reload) {
        
      }
    }, err => console.log(err));
  }

}
