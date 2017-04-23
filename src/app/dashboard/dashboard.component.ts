import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/mergeMap';
import { Subject } from 'rxjs/Subject';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  data$: Observable<any>;

  fileSelected$: Subject<any> = new Subject<any>();
  themeSelected$: ReplaySubject<string> = new ReplaySubject<string>();
  themeCssClass$: Observable<string> = this.themeSelected$
    .map(theme => theme === 'default' ? '' : 'primary-theme');
  segmentSelected$: Subject<any> = new Subject<any>();
  selectedSegment$: any;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.data$ =
      this.dashboardService.getSample1().merge(this.fileSelected$);

    this.selectedSegment$ = this.segmentSelected$.combineLatest(this.data$)
      .map(x => {
        const nodes = x[1][1].nodes;
        return {
          minNode: nodes[x[0].from_node_id],
          maxNode: nodes[x[0].to_node_id]
        };
      });
  }
}
