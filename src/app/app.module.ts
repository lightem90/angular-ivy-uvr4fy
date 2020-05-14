import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { MaterialModule } from './material.module';


import * as firebase from 'firebase/app';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { AppRoutingModule } from './app-routing.module';
import { environment } from './environments/environment';
import { AccountService } from './core/service/account.service';
import { FirebaseHelper } from './core/service/firebase-helper';


if (!firebase.apps.length) {
    firebase.initializeApp(environment.firebase);
}

@NgModule({
  imports:      [ BrowserModule, FormsModule, MaterialModule ],
  declarations: [ AppComponent, HelloComponent ],
  providers: [FirebaseHelper, AccountService],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
