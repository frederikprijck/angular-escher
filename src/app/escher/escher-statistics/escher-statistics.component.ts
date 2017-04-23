import { Component, OnChanges, Input } from '@angular/core';
import { EscherService } from './../escher.service';

@Component({
  selector: 'escher-statistics',
  templateUrl: './escher-statistics.component.html',
  styleUrls: ['./escher-statistics.component.css'],
})
export class EscherStatisticsComponent implements OnChanges {

  @Input() data: any;
  statistics: any = {};

  constructor(private escherService: EscherService) {}

  ngOnChanges(changesObj) {
    if (changesObj.data.currentValue && changesObj.data.currentValue !== changesObj.data.previousValue) {

      const statistics = this.escherService.statistics(this.data[1]);
      if (statistics) {
        this.statistics = {
          nodeTypes: statistics.nodeTypes.map(nodeType => {
            return {
              nodeType: nodeType.nodeType,
              amountOfNodes: nodeType.nodes.length
            };
          }),
          genes: statistics.genes
            .filter(gene => gene.reactions.length > 1)
            .map(gene => {
              return {
                name: gene.name,
                reactions: gene.reactions
              };
            })
        };
      }
    }
  }
}
