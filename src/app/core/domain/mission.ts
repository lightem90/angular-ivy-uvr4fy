import { FirebaseHelper } from "../service/firebase-helper";

export enum MissionType {
  Garbage, 
  Assistance,
  GreenMaintenance
}

export class MeetingPoint {
  constructor(
    public latitude: number = -1,
    public longitude: number = -1,
    public address: string = "",
    public finalized: boolean = false) {

  }
}

//todo: handle optional requirements (gear, tools...)
export class Requirement {

}

export class Mission {
  constructor (
    public ownerUid: string,
    public uid: string = "",
    public name: string = "",
    public description: string = "",
    public missionType : MissionType = MissionType.Garbage,
    public startDate: string = "",
    public endDate: string = "",
    public meetingPoint : MeetingPoint = new MeetingPoint(),
    public requirement : Requirement = new Requirement(),
    public partecipants: string[] = []) {

  }
}

//Business class for the mission editor
export class MissionSession {

  private mission: Mission = null

  constructor(
    private _firebase: FirebaseHelper)  {

  }
  
  startSession() {
    this.mission = new Mission("ciccio") // <-- Logged user
  }

  endSession() {
    //firebase transaction to confirm
  }
}