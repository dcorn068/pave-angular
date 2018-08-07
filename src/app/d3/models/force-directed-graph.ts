import { EventEmitter } from '@angular/core';
import { Link } from './link';
import { Node } from './node';
import * as _d3 from 'd3';

const FORCES = {
  LINKS: 1 / 50,
  COLLISION: 1,
  CHARGE: -1,
  X: 1.75,
  Y: 1.75,
};
const NODE_PADDING = 5;

export class ForceDirectedGraph {
  public ticker: EventEmitter<d3.Simulation<Node, Link>> = new EventEmitter();
  public simulation: d3.Simulation<any, any>;

  public nodes: Node[] = [];
  public links: Link[] = [];

  constructor(nodes, links, options: { width; height }) {
    this.nodes = nodes;
    this.links = links;

    this.initSimulation(options);
  }

  connectNodes(source, target) {
    let link;

    if (!this.nodes[source] || !this.nodes[target]) {
      throw new Error('One of the nodes does not exist');
    }

    link = new Link(source, target);
    this.simulation.stop();
    this.links.push(link);
    this.simulation.alphaTarget(0.3).restart();

    this.initLinks();
  }

  initNodes() {
    if (!this.simulation) {
      throw new Error('simulation was not initialized yet');
    }

    this.simulation.nodes(this.nodes);
  }

  initLinks() {
    if (!this.simulation) {
      throw new Error('simulation was not initialized yet');
    }

    this.simulation.force(
      'links',
      _d3
        .forceLink(this.links)
        .id(d => d['id'])
        .strength(FORCES.LINKS)
    );
  }

  initSimulation(options) {
    if (!options || !options.width || !options.height) {
      throw new Error('missing options when initializing simulation');
    }

    /** Creating the simulation */
    if (!this.simulation) {
      const ticker = this.ticker;

      this.simulation = _d3
        .forceSimulation()
        .force(
          'charge',
          _d3.forceManyBody().strength(d => FORCES.CHARGE * d['r'])
        )
        .force(
          'collide',
          _d3
            .forceCollide()
            .strength(FORCES.COLLISION)
            .radius(d => d['r'] + NODE_PADDING)
            .iterations(2)
        )
        .force('x', _d3.forceX().strength(FORCES.X))
        .force('y', _d3.forceY().strength(FORCES.Y));

      // Connecting the d3 ticker to an angular event emitter
      this.simulation.on('tick', function() {
        ticker.emit(this);
      });

      this.initNodes();
      this.initLinks();
    }

    /** Updating the central force of the simulation */
    this.simulation.force(
      'centers',
      _d3.forceCenter(options.width / 2, options.height / 2)
    );

    /** Restarting the simulation internal timer */
    this.simulation.restart();
  }
}
