import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  }

  ngOnInit() {
  }

  confirm() {

  }

}