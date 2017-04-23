import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-selected-nodes',
  templateUrl: './selected-nodes.component.html',
})
export class SelectedNodesComponent {
  @Input() data: any;
}
