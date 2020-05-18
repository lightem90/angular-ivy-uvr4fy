import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import * as firebase from 'firebase/app';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { AppComponent } from './app/app.component';

import { LoginComponent } from './static/login/login.component';
import { RegisterComponent } from './static/register/register.component'
import { NotFoundComponent } from './static/not-found/not-found.component';
import { AboutComponent } from './static/about/about.component';
import { FaqComponent } from './static/faq/faq.component';
import { ContactsComponent } from './static/contacts/contacts.component';

import { AccountService } from './core/service/account.service';
import { FirebaseHelper } from './core/service/firebase-helper';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { MissionMapComponent } from './app/mission-map/mission-map.component';
import { MissionEditorComponent } from './app/mission-editor/mission-editor.component';
import { MissionViewerComponent } from './app/mission-viewer/mission-viewer.component';
import { environment } from '../environments/environment';


if (!firebase.apps.length) {
    firebase.initializeApp(environment.firebase);
}

export function translateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  imports:      [ 
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
    AngularFireModule.initializeApp(environment.firebase),
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
    ContactsComponent,  ],
  providers: [FirebaseHelper, AccountService],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
