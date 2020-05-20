import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import mapboxgl = require('mapbox-gl');

import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-mission-editor',
  templateUrl: './mission-editor.component.html',
  styleUrls: ['./mission-editor.component.css']
})
export class MissionEditorComponent implements OnInit {

  missionForm : FormGroup

  constructor(
    private _fb : FormBuilder) { 

    this.missionForm = _fb.group({
      missionName: ["", [	
          Validators.maxLength(256),
          Validators.required]
        ],
      missionDate: [new Date(), [
        Validators.required
      ]]
    })

    const geocoder = new MapboxGeocoder({
      accessToken: environment.mapbox.accessToken,
      mapboxgl : mapboxgl
    })

  }

  ngOnInit() {
  }

  confirm() {

  }

}