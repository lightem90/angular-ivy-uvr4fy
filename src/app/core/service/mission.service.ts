import { Injectable } from '@angular/core';
import { Mission, MissionSession } from '../domain/mission';
import { FirebaseHelper } from './firebase-helper';
import { GeoJson } from '../domain/geojson';

@Injectable()
export class MissionService {

  aa : GeoJson
  session: MissionSession = null
  activeMissions : Mission[] = []

  constructor() {
    
    const testM = new Mission("ciccio")
    testM.meetingPoint.latitude = 43.908083
    testM.meetingPoint.longitude = 12.910754
    testM.meetingPoint.finalized = true
    this.activeMissions.push(testM)
    

  }


  startMission() {
    //this.session = new MissionSession(this._helper)
  }

  getAllActiveMissions() : Promise<GeoJson[]> {
    return new Promise<GeoJson[]>(r => [])
    //return new Promise<Mission[]>(r => this.activeMissions.filter(m => m.meetingPoint.finalized))
  }

}