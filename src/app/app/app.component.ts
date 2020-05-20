import { Component, VERSION } from '@angular/core';

import { FirebaseApp } from '@angular/fire';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  constructor(public app: FirebaseApp, 
  private translateService: TranslateService) {
    translateService.addLangs(['it']);
    translateService.setDefaultLang('it');

  }
}
