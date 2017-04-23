import { TestBed, async } from '@angular/core/testing';
import { SimpleChange } from '@angular/core';
import * as escher from 'escher-vis';

import { EscherComponent } from './escher.component';
import { DEFAULT_OPTIONS } from './escher-default-settings';

describe('EscherComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EscherComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(EscherComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should call Builder when data property is set initially`, async(() => {
    spyOn(escher, 'Builder').and.returnValue({
      selection: {
        selectAll: () => {
          return { on: () => { }};
        }
      }
    });

    const fixture = TestBed.createComponent(EscherComponent);
    const app = fixture.debugElement.componentInstance;
    const compiled = fixture.debugElement.nativeElement;

    app.data = 'test';
    app.ngOnChanges({
      data: new SimpleChange(null, app.data, true)
    });

    fixture.detectChanges();

    expect(escher.Builder).toHaveBeenCalledWith('test', null, null, compiled.getElementsByTagName('div')[0], DEFAULT_OPTIONS);
  }));

  it(`should not call Builder when data property is changed after builder was initialised`, async(() => {
    spyOn(escher, 'Builder').and.stub();

    const fixture = TestBed.createComponent(EscherComponent);
    const app = fixture.debugElement.componentInstance;
    const compiled = fixture.debugElement.nativeElement;

    const oldData = 'oldData';
    app.data = 'test';
    app.builder = {
      selection: {
        selectAll: () => {
          return { on: () => { }};
        }
      },
      load_map: () => {},
      map: {
        draw_everything: () => {}
      }
    };
    app.ngOnChanges({
      data: new SimpleChange(oldData, app.data, false)
    });

    fixture.detectChanges();

    expect(escher.Builder).not.toHaveBeenCalled();
  }));

  it(`should call Builder.load_map when data property is changed after builder was initialised`, async(() => {
    const fixture = TestBed.createComponent(EscherComponent);
    const app = fixture.debugElement.componentInstance;
    const compiled = fixture.debugElement.nativeElement;

    const oldData = 'oldData';
    app.data = 'test';
    app.builder = {
      selection: {
        selectAll: () => {
          return { on: () => { }};
        }
      },
      load_map: () => {},
      map: {
        draw_everything: () => {}
      }
    };
    spyOn(app.builder, 'load_map').and.stub();

    app.ngOnChanges({
      data: new SimpleChange(oldData, app.data, false)
    });

    fixture.detectChanges();

    expect(app.builder.load_map).toHaveBeenCalledWith(app.data);
  }));

  it(`should call Builder.map.draw_everything when data property is changed after builder was initialised`, async(() => {
    const fixture = TestBed.createComponent(EscherComponent);
    const app = fixture.debugElement.componentInstance;
    const compiled = fixture.debugElement.nativeElement;

    const oldData = 'oldData';
    app.data = 'test';
    app.builder = {
      selection: {
        selectAll: () => {
          return { on: () => { }};
        }
      },
      load_map: () => {},
      map: {
        draw_everything: () => {}
      }
    };
    spyOn(app.builder.map, 'draw_everything').and.stub();

    app.ngOnChanges({
      data: new SimpleChange(oldData, app.data, false)
    });

    fixture.detectChanges();

    expect(app.builder.map.draw_everything).toHaveBeenCalled();
  }));
});
