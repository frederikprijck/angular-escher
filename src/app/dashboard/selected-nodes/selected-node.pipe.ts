import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'selectedNode'})
export class SelectedNodePipe implements PipeTransform {
  transform(value: any): string {
    return value.name ? `${value.node_type} (${value.name})` : value.node_type;
  }
}
