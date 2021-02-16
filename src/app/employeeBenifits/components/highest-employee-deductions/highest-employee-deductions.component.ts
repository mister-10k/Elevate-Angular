import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { EmployeeBenifitsService } from '../../providers/employee-benifits.service';

@Component({
  selector: 'app-highest-employee-deductions',
  templateUrl: './highest-employee-deductions.component.html',
  styleUrls: ['./highest-employee-deductions.component.scss']
})
export class HighestEmployeeDeductionsComponent implements OnInit, OnDestroy {

  data: any;
  options: any;
  reloadDashboardSub: Subscription;

  constructor(private employeeBenifitsService: EmployeeBenifitsService) { }

  ngOnInit(): void {
    this.getChartData();
    this.setReloadDashboardSub();
    this.options = {
        legend: {
            display: false
        },
        scales: {
          yAxes: [{
              ticks: {
                  beginAtZero: true,
                  callback: function(label, index, labels) {
                    return "$" + label;
                }
              }
          }
        ]
      },
      tooltips: {
        enabled: true,
        mode: 'single',
        callbacks: {
            label: function(tooltipItems, data) { 
                return '$' + tooltipItems.yLabel
            }
        }
      },
    };
  }
  ngOnDestroy() {
    if (this.reloadDashboardSub) this.reloadDashboardSub.unsubscribe();
  }

  getChartData() {
    const obs = this.employeeBenifitsService.getTop10HighestEmployeeDedcutions();
    obs.pipe(take(1)).subscribe(data => {
      this.data = data;
    }, err => console.log(err));
  }
  
  setReloadDashboardSub() {
    this.reloadDashboardSub = this.employeeBenifitsService.reloadDashboard$.subscribe(reload => {
      if (reload) {
        this.getChartData();
      }
    }, err => console.log(err));
  }

}
