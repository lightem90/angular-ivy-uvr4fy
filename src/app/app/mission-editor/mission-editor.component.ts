import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MissionType } from '../../core/domain/mission';


@Component({
  selector: 'app-mission-editor',
  templateUrl: './mission-editor.component.html',
  styleUrls: ['./mission-editor.component.css']
})
export class MissionEditorComponent implements OnInit {

  missionTypes = []
  missionForm : FormGroup
  selectedMissionType : string 

  constructor(
    private _fb : FormBuilder) { 

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
  }

  confirm() {
    //console.log(this.missionForm.get('missionType').value)
  }

}