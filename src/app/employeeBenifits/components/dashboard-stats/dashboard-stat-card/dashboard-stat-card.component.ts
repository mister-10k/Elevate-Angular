import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-stat-card',
  templateUrl: './dashboard-stat-card.component.html',
  styleUrls: ['./dashboard-stat-card.component.scss']
})
export class DashboardStatCardComponent implements OnInit {

  @Input() statName: string;
  @Input() statNumber: number;
  @Input() textColor: string;
  @Input() divider: boolean;
  
  constructor() { }

  ngOnInit(): void {
    if (!this.textColor)
      this.textColor = "grey";
  }

}
