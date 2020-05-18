import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';


import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';

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
import { FirebaseModule } from './firebase.module';



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
    FirebaseModule,
    AppRoutingModule, 
    MaterialModule],
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
