import { Injectable } from '@angular/core';
import { Mission, MissionSession } from '../domain/mission';
import { FirebaseHelper } from './firebase-helper';

@Injectable()
export class MissionService {

  session: MissionSession = null
  activeMissions : Mission[] = []

  constructor(
    private _helper : FirebaseHelper) {
    
    const testM = new Mission("ciccio")
    testM.meetingPoint.latitude = 43.908083
    testM.meetingPoint.longitude = 12.910754
    testM.meetingPoint.finalized = true
    this.activeMissions.push(testM)
    
  }


  startMission() {
    this.session = new MissionSession(this._helper)
  }

  getAllActiveMissions() : Mission[] {
    return this.activeMissions.filter(m => m.meetingPoint.finalized)
  }

}