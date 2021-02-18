import { Component, Input, OnInit } from '@angular/core';
import { EBDashbaordStatsCardModel } from 'src/app/employeeBenifits/models/employeeBenifits.model';

@Component({
  selector: 'app-dashboard-stat-card',
  templateUrl: './dashboard-stat-card.component.html',
  styleUrls: ['./dashboard-stat-card.component.scss']
})
export class DashboardStatCardComponent implements OnInit {

  @Input() data: EBDashbaordStatsCardModel;
  @Input() divider: boolean;
  
  constructor() { }

  ngOnInit(): void {
  }

}
