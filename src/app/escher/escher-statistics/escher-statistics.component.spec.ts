import { TestBed, async, inject } from '@angular/core/testing';
import { SimpleChange } from '@angular/core';

import { EscherStatisticsComponent } from './escher-statistics.component';
import { EscherService } from './../escher.service';

describe('EscherStatisticsComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: EscherService, useValue: { statistics: () => {} }}
      ],
      declarations: [
        EscherStatisticsComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(EscherStatisticsComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should call EscherService.statistics when data property is set initially', async(inject([
      EscherService
    ], (service: EscherService) => {
      spyOn(service, 'statistics').and.stub();

      const fixture = TestBed.createComponent(EscherStatisticsComponent);
      const app = fixture.debugElement.componentInstance;
      const compiled = fixture.debugElement.nativeElement;

      app.data = ['a', 'b'];
      app.ngOnChanges({
        data: new SimpleChange(null, app.data, true)
      });

      fixture.detectChanges();

      expect(service.statistics).toHaveBeenCalledWith('b');
    })));

  it(`should call EscherService.statistics when data property is changed`, async(inject([
      EscherService
    ], (service: EscherService) => {
      spyOn(service, 'statistics').and.stub();

      const fixture = TestBed.createComponent(EscherStatisticsComponent);
      const app = fixture.debugElement.componentInstance;
      const compiled = fixture.debugElement.nativeElement;

      const oldData = 'oldData';
      app.data = ['a', 'b'];
      app.ngOnChanges({
        data: new SimpleChange(oldData, app.data, false)
      });

      fixture.detectChanges();

      expect(service.statistics).toHaveBeenCalledWith('b');
  })));

  it('should map the statistics response when data property is set initially', async(inject([
      EscherService
    ], (service: EscherService) => {
      spyOn(service, 'statistics').and.returnValue({
        nodeTypes: [
          { nodeType: 'a', nodes: ['1', '2'] },
          { nodeType: 'b', nodes: ['3'] }
        ],
        genes: [
          { name: 'c', reactions: ['5', '6'] },
          { name: 'd', reactions: ['7'] }
        ]
      });

      const fixture = TestBed.createComponent(EscherStatisticsComponent);
      const app = fixture.debugElement.componentInstance;
      const compiled = fixture.debugElement.nativeElement;

      app.data = ['a', 'b'];
      app.ngOnChanges({
        data: new SimpleChange(null, app.data, true)
      });

      fixture.detectChanges();

      expect(app.statistics).toBeDefined();
      expect(app.statistics).toEqual({
        nodeTypes: [
          { nodeType: 'a', amountOfNodes: 2 },
          { nodeType: 'b', amountOfNodes: 1 }
        ],
        genes: [
          { name: 'c', reactions: ['5', '6'] }
        ],
      });
    })));

  it('should map the statistics response when data property is changed', async(inject([
      EscherService
    ], (service: EscherService) => {
      spyOn(service, 'statistics').and.returnValue({
        nodeTypes: [
          { nodeType: 'a', nodes: ['1', '2'] },
          { nodeType: 'b', nodes: ['3'] }
        ],
        genes: [
          { name: 'c', reactions: ['5', '6'] },
          { name: 'd', reactions: ['7'] }
        ]
      });

      const fixture = TestBed.createComponent(EscherStatisticsComponent);
      const app = fixture.debugElement.componentInstance;
      const compiled = fixture.debugElement.nativeElement;

      const oldData = 'oldData';
      app.data = ['a', 'b'];
      app.ngOnChanges({
        data: new SimpleChange(oldData, app.data, false)
      });

      fixture.detectChanges();

      expect(app.statistics).toBeDefined();
      expect(app.statistics).toEqual({
        nodeTypes: [
          { nodeType: 'a', amountOfNodes: 2 },
          { nodeType: 'b', amountOfNodes: 1 }
        ],
        genes: [
          { name: 'c', reactions: ['5', '6'] }
        ],
      });
    })));
});
