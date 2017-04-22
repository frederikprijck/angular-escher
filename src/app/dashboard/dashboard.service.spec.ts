import { TestBed, inject, async } from '@angular/core/testing';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/of';
import { DashboardService } from './dashboard.service';

describe('DashboardService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      declarations: [
      ],
      providers: [
        DashboardService,
        { provide: Http, useValue: { get: () => {}} }
      ]
    }).compileComponents();
  }));

  it('should exist', async(inject([ DashboardService ], (service: DashboardService) => {
      expect(service).toBeTruthy();
  })));

  describe('getSample1', () => {
    it('should call the json() method on the result object', async(inject([
      DashboardService,
      Http
    ], (service: DashboardService, http: Http) => {
      const fakeResponse = {
        json: () => {
          return 'ok';
        }
      };
      spyOn(http, 'get').and.returnValue(Observable.of(fakeResponse));
      spyOn(fakeResponse, 'json').and.callThrough();

      service.getSample1().subscribe(x => expect(x).toBe('ok'));

      expect(fakeResponse.json).toHaveBeenCalled();
    })));
  });
});
