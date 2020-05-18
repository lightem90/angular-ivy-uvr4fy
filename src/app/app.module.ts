import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { environment } from '../environments/environment';
import { MaterialModule } from './material.module';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import * as firebase from 'firebase/app';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { AppComponent } from './app/app.component';

import { LoginComponent } from './static/login/login.component';
import { RegisterComponent } from './static/register/register.component'
import { NotFoundComponent } from './static/not-found/not-found.component';
import { AboutComponent } from './static/about/about.component';
import { FaqComponent } from './static/faq/faq.component';
import { ContactsComponent } from './static/contacts/contacts.component';


import { AppRoutingModule } from './app-routing.module';
import { MissionMapComponent } from './app/mission-map/mission-map.component';
import { MissionEditorComponent } from './app/mission-editor/mission-editor.component';
import { MissionViewerComponent } from './app/mission-viewer/mission-viewer.component';

import { AccountService } from './core/service/account.service';
import { FirebaseHelper } from './core/service/firebase-helper';
import { MissionService } from './core/service/mission.service';


if (!firebase.apps.length) {
  firebase.initializeApp(environment.firebase);
}

export function translateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http)
}

@NgModule({
  imports:      [ 
    AngularFireModule.initializeApp(environment.firebase),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateHttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    HttpClientModule,
    BrowserModule, 
    FormsModule, 
    ReactiveFormsModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AppRoutingModule, 
    MaterialModule],
  declarations: [ 
    AppComponent,
    MissionMapComponent,
    MissionEditorComponent,
    MissionViewerComponent,
    LoginComponent, 
    RegisterComponent, 
    NotFoundComponent, 
    AboutComponent, 
    FaqComponent, 
    ContactsComponent],
  providers: [FirebaseHelper, AccountService, MissionService],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
