import { Component, OnInit, Input } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-size-legend-button',
  template: `
  <button class='sizeBtn btn waves-effect z-depth-3'
    [ngStyle]='btnStyles'
    [style.top]="((vizHeight / 2) + navbarHeight - btnHeight) + 'px'"
    [style.right]="'5%'"
    (click)="handleClick()">
    <p>Size</p>
    <p>Legend</p>
  </button>
  `,
  styles: [
    `
      p {
        line-height: 0.5em;
      }
      button {
        width: 100px;
        border-radius: 4px;
        position: fixed;
        opacity: 1;
      }
    `
  ]
})
export class SizeLegendButtonComponent implements OnInit {
  @Input() public forceSimulation;
  @Input() public forceXCombine;
  @Input() public forceYCombine;
  @Input() public forceCluster;
  @Input() public nClusters: number;
  @Input() public vizWidth: number;
  @Input() public vizHeight: number;
  @Input() public navbarHeight: number;
  @Input() public radiusRange: number[];
  public btnHeight = 70;
  public btnStyles = {
    height: this.btnHeight + 'px'
  };
  public data$ = [];
  public active = false;
  constructor() {}

  ngOnInit() {
    // transition height down by half button height
    // setTimeout(() => {
    // d3.select('.colourBtn')
    //   .transition()
    //   .duration(500)
    //   .style('top', ($('.colourBtn').position().top) - ($('.colourBtn').height() / 2) + 'px')
    //   .style('opacity', 1);
    // }, 2000);
  }

  handleClick() {
    this.active = !this.active;
    const that = this;
    // min and max radius
    console.log(that.radiusRange);
    // split the clusters horizontally by size
    const forceXSeparate = d3
      .forceX(function(d) {
        return (
          // 40% screen width
          0.3 *
          // split the width into the range (min, max radius)
          (((that.vizWidth / (that.radiusRange[1] - that.radiusRange[0])) * d.r)
          - (that.vizWidth / 2 ))
        );
      })
      .strength(0.3);

    if (this.active) {
      this.forceSimulation
        .force('x', forceXSeparate)
        // .force('y', that.forceYCombine)
        .force('cluster', null)
        .alpha(0.3)
        .alphaTarget(0.001)
        .restart();
      } else {
        this.forceSimulation
        .force('x', that.forceXCombine)
        .force('cluster', that.forceCluster)
        // .force('y', that.forceYCombine)
        .alpha(0.3)
        .alphaTarget(0.001)
        .restart();
    }
  }
}
