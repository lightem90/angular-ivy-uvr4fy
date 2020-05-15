export class FirebaseConstant {

  static entityTableNames = {
    user : "app-user",
    mission: "app-mission" //key is user, value is list of owned missions
  }

  static relationTableNames = {
    userRole : "user-role",
    userMission: "user-mission"  //key is mission, value is list of partecipants
  }
  
}