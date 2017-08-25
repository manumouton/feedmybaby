import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {TabsPage} from "../pages/tabs/tabs";
import firebase from 'firebase';
import {LoginPage} from "../pages/login/login";

export const firebaseConfig = {
  apiKey: "AIzaSyDQevVrHS9wHKXpLKyPMdOkjALqqBE98M0",
  authDomain: "feedmybaby-a8f1e.firebaseapp.com",
  databaseURL: "https://feedmybaby-a8f1e.firebaseio.com",
  projectId: "feedmybaby-a8f1e",
  storageBucket: "feedmybaby-a8f1e.appspot.com",
  messagingSenderId: "184919232240"
};

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {

    firebase.initializeApp(firebaseConfig);

    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.rootPage = LoginPage;
        unsubscribe();
      } else {
        this.rootPage = TabsPage;
        unsubscribe();
      }
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

