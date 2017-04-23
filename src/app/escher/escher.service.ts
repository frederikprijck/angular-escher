import { Injectable } from '@angular/core';

@Injectable()
export class EscherService {
  statistics(data: any) {
    const nodes = Object.keys(data.nodes).map(key => data.nodes[key]);
    const reactions = Object.keys(data.reactions).map(key => data.reactions[key]);
    const nodeTypes = nodes.map(node => {
      return node.node_type;
    });
    const uniqueNodeTypes = Array.from(new Set(nodeTypes));

    const nodeTypesWithNodes = uniqueNodeTypes.map(nodeType => {
      return {
        nodeType,
        nodes: nodes.filter(item => item.node_type === nodeType)
      };
    });

    const genes = reactions.map(reaction => {
      return reaction.genes;
    });
    const flatGenes = [].concat.apply([], genes);
    const flatGeneNames = flatGenes.map(x => x.name);
    const uniqueGeneNames = Array.from(new Set(flatGeneNames));

    const genesWithReactions = uniqueGeneNames.map(geneName => {
      return {
        name: geneName,
        reactions: reactions
          .filter(reaction => reaction.genes.some(gene => gene.name === geneName))
          .map(reaction => reaction.name)
      };
    });

    return {
        nodeTypes: nodeTypesWithNodes,
        genes: genesWithReactions
    };
  }
}
