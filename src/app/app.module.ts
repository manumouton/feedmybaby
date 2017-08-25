import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';

import {HttpModule} from '@angular/http';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireModule} from 'angularfire2';
import {FirebaseProvider} from '../providers/firebase/firebase';
import {AboutPage} from "../pages/about/about";
import {MealsPage} from "../pages/meals/meals";
import {AddMealPage} from "../pages/add-meal/add-meal";
import {TabsPage} from "../pages/tabs/tabs";
import {GraphsPage} from "../pages/graphs/graphs";
import {DatePicker} from "@ionic-native/date-picker";

const firebaseConfig = {
  apiKey: "AIzaSyDQevVrHS9wHKXpLKyPMdOkjALqqBE98M0",
  authDomain: "feedmybaby-a8f1e.firebaseapp.com",
  databaseURL: "https://feedmybaby-a8f1e.firebaseio.com",
  projectId: "feedmybaby-a8f1e",
  storageBucket: "feedmybaby-a8f1e.appspot.com",
  messagingSenderId: "184919232240"
};

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    HomePage,
    AboutPage,
    MealsPage,
    AddMealPage,
    GraphsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    HomePage,
    AboutPage,
    MealsPage,
    AddMealPage,
    GraphsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseProvider,
    DatePicker
  ]
})
export class AppModule {
}
