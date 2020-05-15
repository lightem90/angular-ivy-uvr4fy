export enum MissionType {
  Garbage, 
  Assistance,
  GreenMaintenance
}

export class Coordinate {
  constructor(
    public latitude: number,
    public longitude: number
  ) {

  }
}

//todo: handle optional requirements (gear, tools...)
export class Requirement {

}

export class Mission {
  constructor (
    public uid: string = "",
    public ownerUid: string,
    public name: string = "",
    public description: string = "",
    public missionType : MissionType = null,
    public startDate: Date = null,
    public endDate: Date = null,
    public startPosition : Coordinate = null,    
    public endPosition : Coordinate = null,
    public requirement : Requirement = null,
    public partecipants: string[] = []) {

  }
}