import { Component, ElementRef, Input, OnChanges } from '@angular/core';
import { Builder } from 'escher-vis';
import { DEFAULT_OPTIONS } from './escher-default-settings';

@Component({
  selector: 'escher-component',
  templateUrl: './escher.component.html'
})
export class EscherComponent implements OnChanges {
  @Input() data: any;

  constructor(
    private elementRef: ElementRef
  ) { }

  ngOnChanges(changesObj) {
    if (changesObj.data.currentValue && changesObj.data.currentValue !== changesObj.data.previousValue) {
      Builder(this.data, null, null, this.elementRef.nativeElement.getElementsByTagName('div')[0], DEFAULT_OPTIONS);
    }
  }
}
