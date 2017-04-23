import { TestBed, inject, async } from '@angular/core/testing';
import { EscherService } from './escher.service';

describe('EscherService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        EscherService
      ]
    }).compileComponents();
  }));

  it('should exist', async(inject([ EscherService ], (service: EscherService) => {
      expect(service).toBeTruthy();
  })));

  describe('statistics', () => {
    it('should return node_types and their nodes', async(inject([
      EscherService
    ], (service: EscherService) => {
      const data = {
        nodes: {
          1: {
            node_type: 'x'
          },
          2: {
            node_type: 'x'
          },
          3: {
            node_type: 'y'
          }
        },
        reactions: {

        }
      };

      const res = service.statistics(data);

      expect(res.nodeTypes.length).toBe(2);
      expect(res.nodeTypes.find(node => node.nodeType === 'x')).toBeDefined();
      expect(res.nodeTypes.find(node => node.nodeType === 'x').nodes.length).toBe(2);
      expect(res.nodeTypes.find(node => node.nodeType === 'y')).toBeDefined();
      expect(res.nodeTypes.find(node => node.nodeType === 'y').nodes.length).toBe(1);
    })));

    it('should return genes and their reactions', async(inject([
      EscherService
    ], (service: EscherService) => {
      const data = {
        nodes: {
        },
        reactions: {
          1: {
            name: 'x',
            genes: [
              { name: 'a' }
            ]
          },
          2: {
            name: 'y',
            genes: [
              { name: 'a' },
              { name: 'b' }
            ]
          },
          3: {
            name: 'z',
            genes: [
              { name: 'c' }
            ]
          }
        }
      };

      const res = service.statistics(data);

      expect(res.genes.length).toBe(3);
      expect(res.genes.find(gene => gene.name === 'a')).toBeDefined();
      expect(res.genes.find(gene => gene.name === 'a').reactions.length).toBe(2);

      expect(res.genes.find(gene => gene.name === 'b')).toBeDefined();
      expect(res.genes.find(gene => gene.name === 'b').reactions.length).toBe(1);

      expect(res.genes.find(gene => gene.name === 'c')).toBeDefined();
      expect(res.genes.find(gene => gene.name === 'c').reactions.length).toBe(1);
    })));
  });
});
