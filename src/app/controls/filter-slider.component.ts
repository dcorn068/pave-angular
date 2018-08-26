import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from '../services/data.service';
import * as d3 from 'd3';

@Component({
  selector: 'app-filter-slider',
  template: `
    <div class="slider-container">
      <div class="title">
      <p>{{title}}</p>
      </div>
      <mat-slider thumbLabel [min]="min" [max]="max" step="1"
      [style.pointerEvents]="'auto'"
      [(ngModel)]="sliderValue"
      tickInterval="10"
      (input)="fireDragEvent($event)"
      (change)="fireMouseUpEvent($event)"
      ></mat-slider>
    </div>
  `,
  styles: [
    `
      .title p {
        line-height: 1.5rem;
        word-wrap: break-word;
        height: 25px;
        width: 108px;
      }
      @media only screen and (max-width: 692px) {
        mat-slider {
          padding-top: 0px;
          margin-top: -15px;
          width: 40vw;
        }
        .title p {
          height: 15px;
          width: auto;
        }
      }
      @media only screen and (max-width: 425px) {
        mat-slider {
          width: 60vw;
        }
      }
    `
  ]
})
export class FilterSliderComponent implements OnInit {
  @Input()
  sliderValue;
  @Input()
  title;
  @Input()
  filterVariable;
  @Output()
  mouseUpEvent = new EventEmitter();
  @Output()
  dragEvent = new EventEmitter();
  min;
  max;

  constructor(private _dataService: DataService) {}

  ngOnInit() {
    // load data and set slider range on creation
    this._dataService.getData().subscribe(receivedData => {
      this.min = d3.min(receivedData.map(d => d[this.filterVariable]));
      // shrink max to expand slider usability
      this.max = d3.max(receivedData.map(d => d[this.filterVariable])) * 0.7;
    });
  }

  fireDragEvent(e) {
    this.dragEvent.emit(e);
  }
  fireMouseUpEvent(e) {
    this.mouseUpEvent.emit(e);
  }
}
