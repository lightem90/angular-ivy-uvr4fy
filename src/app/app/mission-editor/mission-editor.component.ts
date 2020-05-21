import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MissionType } from '../../core/domain/mission';
import { MapboxHelper } from '../../core/service/mapbox-helper';

import mapboxgl = require('mapbox-gl');
import MapboxGeocoder = require('@mapbox/mapbox-gl-geocoder');


@Component({
  selector: 'app-mission-editor',
  templateUrl: './mission-editor.component.html',
  styleUrls: ['./mission-editor.component.css']
})
export class MissionEditorComponent implements OnInit {

  @ViewChild("geocoder") geocoderRef : ElementRef

  missionTypes = []
  missionForm : FormGroup
  selectedMissionType : string 

  picker : mapboxgl.Marker;
  map: mapboxgl.Map;
  geocoder : MapboxGeocoder

  style = 'mapbox://styles/mapbox/streets-v11';
  @Input() lat : number = 43.9092
  @Input() lng : number = 12.9127
  @Input() zoom : number = 12.89

  constructor(
    private _fb : FormBuilder,
    private _mapboxHelper: MapboxHelper) { 

    this.missionTypes = Object.values(MissionType).filter(x => typeof x === 'string')

    this.missionForm = _fb.group({

      missionName: ["", [	
          Validators.maxLength(64),
          Validators.required]
        ],

      missionDate: [new Date(), [
        Validators.required
      ]],

      missionType : ["",
        Validators.required        
      ],

      missionTimepicker : ["",
        Validators.required ],

      missionDesc : ["", [
          Validators.maxLength(64)
        ]
      ]
    })    
  }

  ngOnInit() {    
    
    const res = this._mapboxHelper.createMap(
        this.style, 
        this.zoom, 
        this.lng, 
        this.lat)

    this.map = res.map;

    this.picker = new mapboxgl.Marker()
      .setLngLat([this.lng, this.lat])
      .addTo(this.map)
    
    this.geocoder = this._mapboxHelper.createGeocoder()
    this.geocoder.addTo("#geocoder")
    this.geocoder.on('result', ev => this.map.flyTo({
      center: ev.result.center,
      essential : true
    }))

    //in this way the picker stays in the same position
    this.map
      .on('movestart', _ => this._updatePickerPosition())
      .on('move', _ => this._updatePickerPosition())
      .on('moveend', _ => this._updatePickerPosition())
  }

  confirm() {
    //console.log(this.missionForm.get('missionType').value)
  }

  _updatePickerPosition() {
    this.picker.setLngLat(this.map.getCenter());
    //TODO geocoding
  }

}