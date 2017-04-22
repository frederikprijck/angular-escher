import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DashboardService {

  constructor(private http: Http) { }

  getSample1() {
    return this.http
      .get('/assets/e_coli_core.Core-metabolism.json')
      .map(result => result.json());
  }
}
