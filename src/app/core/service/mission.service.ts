import { Injectable } from '@angular/core';
import { Mission } from '../domain/mission';
import { FirebaseHelper } from './firebase-helper';

@Injectable()
export class MissionService {

  constructor(
    private _helper : FirebaseHelper) { }

  createMission() {
    //todo: db transaction
    return new Mission()
  }

  editMission(mission: Mission) {

  }

}