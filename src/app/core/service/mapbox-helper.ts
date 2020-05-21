import { Injectable } from "@angular/core";
import { environment } from '../../../environments/environment';

import mapboxgl = require('mapbox-gl');
import MapboxGeocoder = require('@mapbox/mapbox-gl-geocoder');

@Injectable()
export class MapboxHelper {

  constructor() {    
    mapboxgl.accessToken = environment.mapbox.accessToken;
  }

  createMap(style, zoom, lng, lat, addGeocoder: boolean = false) {
    
    const map = new mapboxgl.Map({
        container: 'map',
        style: style,
        zoom: zoom,
        center: [lng, lat]
    })
    // Add map controls
    map.addControl(new mapboxgl.NavigationControl())
    if (addGeocoder) {
      map.addControl(new MapboxGeocoder({      
          accessToken: environment.mapbox.accessToken,  
          countries: 'it',
          mapboxgl: mapboxgl
        })
      )
    }

    map.on('load', (event) => {
      map.addSource('firebase', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: []
        }
      })
    })

    const source = map.getSource('firebase') 

    return {
      map : map,
      source : source
    }
  }

  debugEnabled() {
    return !environment.production
  }

}