import { Component, OnInit } from '@angular/core';

import mapboxgl = require('mapbox-gl');

import { MissionService } from '../../core/service/mission.service';
import { FeatureCollection } from '../../core/domain/geojson';
import { MapboxHelper } from '../../core/service/mapbox-helper';

@Component({
  selector: 'app-mission-map',
  templateUrl: './mission-map.component.html',
  styleUrls: ['./mission-map.component.css']
})
export class MissionMapComponent implements OnInit {
  
  source : any;
  map: mapboxgl.Map;

  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 43.9092;
  lng = 12.9127;
  zoom = 12.89

  constructor(
    private _missionService : MissionService,
    private _mapboxHelper: MapboxHelper) {

  }

  ngOnInit() {    
    
    const res = this._mapboxHelper.createMap(
        this.style, 
        this.zoom, 
        this.lng, 
        this.lat,
        true)
    
    this.map = res.map;
    this.source = res.source;

    if (this._debugEnabled()){    
        this.map.on('mousemove', (data) => {
        this.lat = data.lngLat.lat
        this.lng = data.lngLat.lng
        this.zoom = this.map.getZoom()
      })
    }

    this._missionService
      .getAllActiveMissions()
      .then(res => {
        let data = new FeatureCollection(res)
        this.source = data
      })
      // .forEach(m => {
      //   new mapboxgl.Marker()
      //   .setLngLat([m.meetingPoint.longitude, m.meetingPoint.latitude])
      //   .addTo(this.map)
      // })    
  }

  startMission() {
    
  }

  _debugEnabled() {
    return this._mapboxHelper.debugEnabled()
  }

}