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
    spyOn(escher, 'Builder').and.stub();

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

  it(`should call Builder when data property is changed`, async(() => {
    spyOn(escher, 'Builder').and.stub();

    const fixture = TestBed.createComponent(EscherComponent);
    const app = fixture.debugElement.componentInstance;
    const compiled = fixture.debugElement.nativeElement;

    const oldData = 'oldData';
    app.data = 'test';
    app.ngOnChanges({
      data: new SimpleChange(oldData, app.data, false)
    });

    fixture.detectChanges();

    expect(escher.Builder).toHaveBeenCalledWith('test', null, null, compiled.getElementsByTagName('div')[0], DEFAULT_OPTIONS);
  }));
});
