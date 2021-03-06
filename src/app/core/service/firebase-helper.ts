import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/auth';
import {AngularFireDatabase, AngularFireList , AngularFireObject } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';

import firebase from 'firebase';

import { FirebaseConstant } from './firebase-constant'

@Injectable()
export class FirebaseHelper
{
  private _authChangedSubject = new Subject<firebase.User>();
  private firebaseRefs : firebase.database.Reference[]

  _currentUser : firebase.User
  authChanged : Observable<firebase.User> = this._authChangedSubject

  constructor(
    private auth: AngularFireAuth,
    private database: AngularFireDatabase,
    private storage: AngularFireStorage) 
  {
    let self = this
    // recommended way to get the current user
    auth.onAuthStateChanged(function(user) {
      self._authChangedSubject.next(user)
      self._currentUser = user
      }      
    )
    // Firebase references that are listened to.
    this.firebaseRefs = [];
  }

  login(email: string, password: string) {
    return this.auth
      .signInWithEmailAndPassword(email, password)
  }

  register(email: string, password: string) {
    return this.auth
      .createUserWithEmailAndPassword(email, password)
      .then(r => {
        this._addDataForUser({
          email : email,
          password : password
        },
        FirebaseConstant.entityTableNames.user)
      })
  }
  

  doFacebookLogin() {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.FacebookAuthProvider();
      this.auth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res);
      }, err => {
        console.log(err);
        reject(err);
      });
    });
  }

  doGoogleLogin() {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.auth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res);
      });
    });
  }

  signInAnonymously(){
    return new Promise<any>((resolve, reject) => {
      this.auth
      .signInAnonymously()
      .then(res => {
        resolve(res);
      }, err => {
        console.log(err);
        reject(err);
      });
    });
  }  

  getAssetSrc(assetPath: string){
    return this.storage.ref(assetPath).getDownloadURL();
  }

  
  // getUserServices() {

  //   if (this._currentUser) {
  //     let feedPromise : Promise<any> = 
  //       this._getFeed(
  //         FirebaseConstant.relationTableNames.userService 
  //         + '/' 
  //         + this._currentUser.uid)
  //       .then((data) => {
  //         const entries = data.val() || {}
  //         return entries;
  //     })

  //     return feedPromise.then(res => {

  //       const worksId = Object.keys(res);
  //       var result : ExternalWork[] = []
  //       for (let i = 0; i < worksId.length; i++) {
  //         var dbWork = res[worksId[i]]
  //         result.push(dbWork)
  //       }

  //       return result;
  //     })
  //   } 
  //   return new Promise<ExternalWork[]>(resolve => resolve([]))    
  // }

  deleteEntryForUser(tableName : string, entryId : string) {
    this.database.database
      .ref(tableName 
          + '/' 
          + this._currentUser.uid 
          + '/'
          + entryId)
      .remove()
  }

  /**
   * Turns off all Firebase listeners.
   */
  cancelAllSubscriptions() {
    this.firebaseRefs.forEach((ref) => ref.off());
    this.firebaseRefs = [];
  }

  _getFeed(uri: string){
    return this.database.database.ref(uri).once('value')
  }

  _updateDataForUser(
    dataKey: string, 
    dataToAdd: any, 
    dataTableName: string) {

    var updates = {};
    updates['/' + dataTableName + '/' + this._currentUser.uid + '/' + dataKey] = dataToAdd;

    return this.database.database.ref().update(updates);
  }

  //adds into a table a new document
  _addDataForUser(
    dataToAdd: any, 
    dataTableName: string) {

    var newDataKey = this.database.database
      .ref()
      .child(dataTableName + '/' + this._currentUser.uid)
      .push()
      .key;

    dataToAdd.uid = newDataKey;

    return this._updateDataForUser(newDataKey, dataToAdd, dataTableName)
  }  
}