import { Injectable } from '@angular/core';
import firebase from 'firebase';
import {AngularFireAuth} from "angularfire2/auth";
import {FirebaseProvider} from "../firebase/firebase";
import {User} from "firebase/app";

@Injectable()
export class ProfileProvider {
  public currentUser:User;

  constructor(private angularFireAuth: AngularFireAuth,
              private firebaseProvider: FirebaseProvider) {
    this.angularFireAuth.auth.onAuthStateChanged( user => {
      if (user){
        this.currentUser = user;
        this.userProfile = firebase.database().ref(`/userProfile/${user.uid}`);
      }
    });
  }

  getUserProfile(): firebase.database.Reference {
    return this.userProfile;
  }

  updateName(firstName: string, lastName: string): firebase.Promise<void> {
    return this.userProfile.update({
      firstName: firstName,
      lastName: lastName,
    });
  }

  updateDOB(birthDate: string): firebase.Promise<any> {
    return this.userProfile.update({
      birthDate: birthDate,
    });
  }

  updateEmail(newEmail: string, password: string): firebase.Promise<any> {
    const credential =  firebase.auth.EmailAuthProvider
      .credential(this.currentUser.email, password);

    return this.currentUser.reauthenticateWithCredential(credential).then( user => {
      this.currentUser.updateEmail(newEmail).then( user => {
        this.userProfile.update({ email: newEmail });
      });
    });
  }

  updatePassword(newPassword: string, oldPassword: string): firebase.Promise<any> {
    const credential =  firebase.auth.EmailAuthProvider
      .credential(this.currentUser.email, oldPassword);

    return this.currentUser.reauthenticateWithCredential(credential).then( user => {
      this.currentUser.updatePassword(newPassword).then( user => {
        console.log("Password Changed");
      }, error => {
        console.log(error);
      });
    });
  }
}
