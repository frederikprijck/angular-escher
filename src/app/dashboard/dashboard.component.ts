import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  title = 'Dashboard';
  data$: any;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.data$ = this.dashboardService.getSample1();
  }
}
