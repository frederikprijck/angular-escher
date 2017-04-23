import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/mergeMap';
import { Subject } from 'rxjs/Subject';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  title = 'Dashboard';

  data$: any;

  fileSelected$: Subject<any> = new Subject<any>();
  themeSelected$: ReplaySubject<string> = new ReplaySubject<string>();
  themeCssClass$: Observable<string> = this.themeSelected$
    .map(theme => theme === 'default' ? '' : 'primary-theme');

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.data$ =
      this.dashboardService.getSample1().merge(this.fileSelected$);
  }
}
