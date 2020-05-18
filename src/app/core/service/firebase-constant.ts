export class FirebaseConstant {

  static entityTableNames = {
    user: "app-user",       //list of users with their data (if any)
    mission: "app-mission"  //list of confirmed missions with data and ids
  }

  static relationTableNames = {
    userMission: "mission-partecipants",    //key is mission, value is list of partecipant uids
    missionOwnership: "user-mission"        //key is user, value is list of owned mission uids
  }

  //OPERATION
  //A) Adding/Removing mission
  //1- New entry in app-mission 2- new entry in user mission 3- new entry in mission-part (owner must partecipates)
  //B) Joining/Leaving mission
  //1- Add entry (joining user id) in userMission for selected mission
  //C) TODO feedback system for user / mission
  
}