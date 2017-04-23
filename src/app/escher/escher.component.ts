import { Component, ElementRef, Input, Output, OnChanges } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Builder } from 'escher-vis';
import { DEFAULT_OPTIONS } from './escher-default-settings';

@Component({
  selector: 'escher-component',
  templateUrl: './escher.component.html'
})
export class EscherComponent implements OnChanges {
  @Input() data: any;
  @Output() onSegmentSelect: Subject<any> = new Subject<any>();
  builder: any;

  constructor(
    private elementRef: ElementRef
  ) { }

  ngOnChanges(changesObj) {
    if (changesObj.data && changesObj.data.currentValue && changesObj.data.currentValue !== changesObj.data.previousValue) {
      if (this.builder) {
        this.builder.load_map(this.data);
        this.builder.map.draw_everything();
      } else {
        this.builder = Builder(this.data, null, null, this.elementRef.nativeElement.getElementsByTagName('div')[0], DEFAULT_OPTIONS);
      }

      this.builder.selection.selectAll('.segment')
        .on('click', (data) => {
            this.onSegmentSelect.next(data);
        });
    }
  }
}
