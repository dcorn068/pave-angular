import { Component, OnInit, Input, AfterContentInit } from '@angular/core';
import * as d3 from 'd3';
import { DataService } from '../data.service';

@Component({
  selector: 'app-change-colours-dropdown',
  template: `

<mat-form-field class="colours-select"
[style.display]="(active ? 'inline' : 'none')"
>
  <mat-select
  placeholder="Circle colour"
  [(value)]="clusterSelector"
  (selectionChange)="changeSelection($event)"
  >
    <mat-option value="none">-- None --</mat-option>
    <mat-optgroup *ngFor="let group of clusterSelectorGroups" [label]="group.name"
                  >
      <mat-option *ngFor="let item of group.members" [value]="item.value">
        {{item.viewValue}}
      </mat-option>
    </mat-optgroup>
  </mat-select>
</mat-form-field>

  `,
  styles: [
    `
      .colours-select {
        position: fixed;
        bottom: 300px;
        left: 30px;
        background: rgba(246, 248, 255, 0.7);
      }
    `
  ]
})
export class ChangeColoursDropdownComponent implements OnInit, AfterContentInit {
  @Input() clusterSelector;
  @Input() colourScale;
  @Input() uniqueClusterValues;
  @Input() nodes;
  @Input() clusterCenters;
  @Input() forceSimulation;
  @Input() nodeAttraction;
  @Input() nodePadding;
  @Input() forceCluster;
  public active = true;
  public data$;
  public newClusters;

  public clusterSelectorGroups = [
    {
      name: 'Statistics',
      members: [
        { value: 'industry', viewValue: 'Job Industry (large category groups)' },
        { value: 'sector', viewValue: 'Job Sector (small category groups)' },
        { value: 'minEduc', viewValue: 'Minimum years of education' }
      ]
    },
    {
      name: 'Skills',
      members: [
        { value: 'topSkill1', viewValue: 'Most useful skill for each job' },
      ]
    }
  ];

  constructor(private _dataService: DataService) { }

  ngOnInit() { }

  ngAfterContentInit() {
    this._dataService.getData().subscribe(receivedData => {
      this.data$ = receivedData;
    });
  }

  changeSelection($event) {
    const that = this;
    // change the axis selectors
    that.clusterSelector = $event.value;

    // convert each unique value to a cluster number
    this.uniqueClusterValues = this.data$
      .map(d => d[that.clusterSelector])
      // filter uniqueOnly
      .filter((value, index, self) => self.indexOf(value) === index);

    // reset the clusters
    this.clusterCenters = new Array;

    // define the nodes
    this.nodes = this.data$.map(d => {
      // SELECT THE CLUSTER VARIABLE 2/2
      const forcedCluster = this.uniqueClusterValues.indexOf(d[that.clusterSelector]) + 1;

      // redefine the nodes
      d = {
        id: d.id,
        // circle attributes
        r: d3.select('#circle_' + d.id).attr('r'),
        x: d3.select('#circle_' + d.id).attr('cx'),
        y: d3.select('#circle_' + d.id).attr('cy'),
        cluster: forcedCluster,
        clusterValue: d[that.clusterSelector],
        // skills
        math: d.skillsMath,
        logic: d.skillsLogi,
        language: d.skillsLang,
        computer: d.skillsComputer,
        // tooltip info
        all: d
      };
      if (d.id === 200) { console.log(this.clusterCenters); }
      if (d.id === 494) { console.log(this.clusterCenters); }
      // add to clusters array if it doesn't exist or the radius is larger than another radius in the cluster
      if (
        !this.clusterCenters[forcedCluster] ||
        d.r > this.clusterCenters[forcedCluster].r
      ) {
        this.clusterCenters[forcedCluster] = d;
      }
      return d;
    });

    // transition the circle colours
    d3.selectAll('circle').transition()
      .attr('fill', (d, i) => this.colourScale(this.nodes[i].cluster))
      .delay((d, i) => i * 0.8);

      // .attr('r', that.clusterSelector === 'none' ? window.innerWidth * 0.009 :
      //   d => that.colourScale(+d.all[that.clusterSelector]))

    this.forceCluster = alpha => {
      that.nodes.forEach((d, i) => {
        const cluster = that.clusterCenters[d.cluster];
        // if (d.id === 200) { console.log(cluster); }
        // if (d.id === 200) { console.log(d); }
        if (cluster === d) {
          return;
        }
        let x = d.x - cluster.x,
          y = d.y - cluster.y,
          l = Math.sqrt(x * x + y * y);
        const r = d.r + cluster.r;
        if (l !== r) {
          l = ((l - r) / l) * alpha;
          d.x -= x *= l;
          d.y -= y *= l;
          cluster.x += x;
          cluster.y += y;
        }
      });
    };


    setTimeout(() => {
      this.forceSimulation
        .force('cluster', (this.clusterSelector === 'none' ? null : this.forceCluster))
        .alpha(0.3)
        .restart();
    }, 500);
  }
}
