import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MyApp } from './app.component';
//import { AuthService } from '../providers/authservice';
import {Popup} from '../providers/popup'
import { tipo } from '../pages/tipo/tipo';
import { LoginPage } from '../pages/login/login';
import { test } from '../pages/test/test';
import { Result } from '../pages/result/result';
import { acerca } from '../pages/acerca/acerca';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { RoundOfPipe, OrderBy } from '../pipes/pipe';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    test,
    Result,
    RoundOfPipe,
    OrderBy,
    acerca,
    tipo
  ],
  imports: [
    IonicModule.forRoot(MyApp,
    {
      backButtonText: '',
      mode: "md",
    },),
 
    BrowserModule,
    HttpModule,

    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage, 
    test,
    Result,
    acerca,
    tipo
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Popup, StatusBar, SplashScreen, InAppBrowser]
})
export class AppModule {}
