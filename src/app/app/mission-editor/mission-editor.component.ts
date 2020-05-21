import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { MissionType } from '../../core/domain/mission';
import { MapboxHelper } from '../../core/service/mapbox-helper';

import mapboxgl = require('mapbox-gl');
import MapboxGeocoder = require('@mapbox/mapbox-gl-geocoder');

export class DialogData {
  constructor(
  public zoom : number,
  public latitude : number,
  public longitude : number) {

  }
}

@Component({
  selector: 'app-mission-editor',
  templateUrl: './mission-editor.component.html',
  styleUrls: ['./mission-editor.component.css']
})
export class MissionEditorComponent implements OnInit {

  missionTypes = []
  missionForm : FormGroup
  selectedMissionType : string 

  picker : mapboxgl.Marker;
  map: mapboxgl.Map;
  geocoder : MapboxGeocoder

  style = 'mapbox://styles/mapbox/streets-v11';
  

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<MissionEditorComponent>,
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
        this.data.zoom, 
        this.data.longitude, 
        this.data.latitude,
        'picker_map')

    this.map = res.map;

    this.picker = new mapboxgl.Marker()
      .setLngLat([this.data.longitude, this.data.latitude])
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

  onNoClick(): void {
    this.dialogRef.close()
  }

  _updatePickerPosition() {
    this.picker.setLngLat(this.map.getCenter());
    //TODO geocoding
  }

  abort() {
    this.dialogRef.close()
  }

}