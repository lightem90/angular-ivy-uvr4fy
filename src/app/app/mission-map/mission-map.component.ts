import { Component, OnInit } from '@angular/core';

import { environment } from '../../../environments/environment';

import mapboxgl = require('mapbox-gl');
import { MissionService } from '../../core/service/mission.service';
import { FeatureCollection } from '../../core/domain/geojson';

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
    private _missionService : MissionService) {

  }

  ngOnInit() {    
    
    mapboxgl.accessToken = environment.mapbox.accessToken;

    this.map = new mapboxgl.Map({
        container: 'map',
        style: this.style,
        zoom: this.zoom,
        center: [this.lng, this.lat]
    })
    // Add map controls
    this.map.addControl(new mapboxgl.NavigationControl())

    this.map.on('load', (event) => {
      this.map.addSource('firebase', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: []
        }
      })
    })

    this.source = this.map.getSource('firebase') 

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

  _debugEnabled() {
    return !environment.production
  }

}