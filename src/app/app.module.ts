import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';

import {firebaseConfig, MyApp} from './app.component';

import {HttpModule} from '@angular/http';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from "angularfire2/auth";
import {AngularFirestoreModule} from 'angularfire2/firestore’;
import {TabsPage} from "../pages/tabs/tabs";

import {AuthProvider} from '../providers/auth/auth';

import {HomePage} from "../pages/home/home";
import {AboutPage} from "../pages/about/about";
import {MealsPage} from "../pages/meals/meals";
import {AddMealPage} from "../pages/add-meal/add-meal";
import {GraphsPage} from "../pages/graphs/graphs";
import {LoginPage} from "../pages/login/login";
import {ResetPasswordPage} from "../pages/reset-password/reset-password";
import {SignupPage} from "../pages/signup/signup";
import {ProfilePage} from "../pages/profile/profile";
import {MealsProvider} from "../providers/firebase/mealsProvider";
import {UserProfileProvider} from "../providers/firebase/userProfileProvider";
import {FIREBASE_CREDENTIALS} from "./firebase.credentials";

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    ResetPasswordPage,
    SignupPage,
    ProfilePage,
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
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CREDENTIALS),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    ResetPasswordPage,
    SignupPage,
    ProfilePage,
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
    MealsProvider,
    UserProfileProvider,
    AuthProvider
  ]
})
export class AppModule {
}
