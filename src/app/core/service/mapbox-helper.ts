import { Injectable, ViewChild, ElementRef } from "@angular/core";
import { environment } from '../../../environments/environment';

import mapboxgl = require('mapbox-gl');
import MapboxGeocoder = require('@mapbox/mapbox-gl-geocoder');

@Injectable()
export class MapboxHelper {


  constructor() {    
    mapboxgl.accessToken = environment.mapbox.accessToken;
  }

  createMap(style, zoom, lng, lat, container) {
    
    const map = new mapboxgl.Map({
        container: container,
        style: style,
        zoom: zoom,
        center: [lng, lat]
    })
    // Add map controls
    map.addControl(new mapboxgl.NavigationControl())

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

  createGeocoder(
    reverse: boolean = false,
    addPicker: boolean = false) {

    return new MapboxGeocoder({      
      accessToken: environment.mapbox.accessToken,  
      countries: 'it',
      mapboxgl: mapboxgl,
      marker : addPicker,
      reverseGeocode: reverse
    })
  }

  buildReverseGeocodingQuery(lng, lat){
    return "https://api.mapbox.com/geocoding/v5/mapbox.places/12.92123340684202%2C43.91075125833041.json?access_token=pk.eyJ1Ijoic2VhcmNoLW1hY2hpbmUtdXNlci0xIiwiYSI6ImNrN2Y1Nmp4YjB3aG4zZ253YnJoY21kbzkifQ.JM5ZeqwEEm-Tonrk5wOOMw&cachebuster=1590091383003&autocomplete=true"
    // return `https://api.mapbox.com/geocoding/v5/address/${lng}%2C${lat}.json?access_token=${environment.mapbox.accessToken}&cachebuster=1590091383003&autocomplete=true`
  }

  debugEnabled() {
    return !environment.production
  }

}