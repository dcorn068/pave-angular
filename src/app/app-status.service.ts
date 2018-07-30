import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppStatusService {
  private _radiusSelectorSource = new BehaviorSubject<any>('none');
  public currentRadiusSelector = this._radiusSelectorSource.asObservable();

  private _clusterSelectorSource = new BehaviorSubject<any>('industry');
  public currentClusterSelector = this._clusterSelectorSource.asObservable();

  private _forceClusterSource = new BehaviorSubject<any>(null);
  public currentForceCluster = this._forceClusterSource.asObservable();

  private _forceSimulationSource = new BehaviorSubject<any>(null);
  public currentForceSimulation = this._forceSimulationSource.asObservable();

  private _uniqueClusterValuesSource = new BehaviorSubject<any>(null);
  public currentUniqueClusterValues = this._uniqueClusterValuesSource.asObservable();

  private _numClustersSource = new BehaviorSubject<any>(10);
  public currentNumClusters = this._numClustersSource.asObservable();

  private _clusterCentersSource = new BehaviorSubject<any>(
    new Array(this.currentNumClusters)
  );

  public currentClusterCenters = this._clusterCentersSource.asObservable();

  private _radiusRangeSource = new BehaviorSubject<any>(null);
  public currentRadiusRange = this._radiusRangeSource.asObservable();

  private _radiusScaleSource = new BehaviorSubject<any>(null);
  public currentRadiusScale = this._radiusScaleSource.asObservable();

  private _colourSortActiveSource = new BehaviorSubject<any>(false);
  public currentColourSortActive = this._colourSortActiveSource.asObservable();

  private _nodesSource = new BehaviorSubject<any>(null);
  public currentNodes = this._nodesSource.asObservable();

  private _filteredNodesSource = new BehaviorSubject<any>(null);
  public currentFilteredNodes = this._filteredNodesSource.asObservable();

  // private _circlesSource = new BehaviorSubject<any>(null);
  // public currentCircles = this._circlesSource.asObservable();

  // todo: subscribe to nodes?

  public changeRadiusSelector(v) {
    this._radiusSelectorSource.next(v);
  }

  public changeClusterSelector(v) {
    this._clusterSelectorSource.next(v);
  }

  public changeForceCluster(v) {
    this._forceClusterSource.next(v);
  }

  public changeForceSimulation(v) {
    this._forceSimulationSource.next(v);
  }

  public changeUniqueClusterValues(v) {
    this._uniqueClusterValuesSource.next(v);
  }

  public changeClusterCenters(v) {
    this._clusterCentersSource.next(v);
  }

  public changeRadiusRange(v) {
    this._radiusRangeSource.next(v);
  }

  public changeRadiusScale(v) {
    this._radiusScaleSource.next(v);
  }

  public changeColourSortActive(v) {
    this._colourSortActiveSource.next(v);
  }

  public changeNodes(v) {
    this._nodesSource.next(v);
  }

  public changeFilteredNodes(v) {
    this._filteredNodesSource.next(v);
  }

  // public changeCircles(v) {
  //   this._circlesSource.next(v);
  // }

  public changeNumClusters(v) {
    this._numClustersSource.next(v);
  }

  constructor() {}
}
