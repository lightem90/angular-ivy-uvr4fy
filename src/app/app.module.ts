import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { MaterialModule } from './material.module';


import * as firebase from 'firebase/app';
import { LoginComponent } from './static/login/login.component';
import { RegisterComponent } from './static/register/register.component'
import { NotFoundComponent } from './static/not-found/not-found.component';
import { AboutComponent } from './static/about/about.component';
import { FaqComponent } from './static/faq/faq.component';
import { ContactsComponent } from './static/contacts/contacts.component';
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
  declarations: [ 
    AppComponent, 
    HelloComponent, 
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
