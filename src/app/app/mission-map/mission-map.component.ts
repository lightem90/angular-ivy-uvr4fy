import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

import mapboxgl = require('mapbox-gl');

@Component({
  selector: 'app-mission-map',
  templateUrl: './mission-map.component.html',
  styleUrls: ['./mission-map.component.css']
})
export class MissionMapComponent implements OnInit {
  
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 37.75;
  lng = -122.41;

  constructor() { }

  ngOnInit() {    
    
    mapboxgl.accessToken = environment.mapbox.accessToken;

    this.map = new mapboxgl.Map({
        container: 'map',
        style: this.style,
        zoom: 13,
        center: [this.lng, this.lat]
    })
    // Add map controls
    this.map.addControl(new mapboxgl.NavigationControl())
    }

}