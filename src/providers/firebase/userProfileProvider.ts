import {Injectable} from "@angular/core";
import {Promise} from "firebase/app";
import Reference = firebase.database.Reference;
import {AngularFireDatabase} from "angularfire2/database";
import {User} from "firebase/app";
import {AngularFireAuth} from "angularfire2/auth";

@Injectable()
export class UserProfileProvider {

  public currentUser: User;
  public userProfile: Reference;

  //User profile
  private userProfilesRef: Reference;

  constructor(public afd: AngularFireDatabase, private angularFireAuth: AngularFireAuth) {
    this.userProfilesRef = afd.database.ref('/userProfile');
    this.angularFireAuth.auth.onAuthStateChanged(user => {
      if (user) {
        this.currentUser = user;
        this.userProfile = firebase.database().ref(`/userProfile/${user.uid}`);
      }
    });
  }

  //User profile
  createUserProfile(user, email: string) {
    this.userProfilesRef.child(user.uid).set({
      email: email
    });
  }

  disconnectUser(userUid: string) {
    this.userProfilesRef.child(userUid).off();
  }

  getUserProfile(): firebase.database.Reference {
    return this.userProfile;
  }

  updateName(firstName: string, lastName: string): Promise<void> {
    return this.userProfile.update({
      firstName: firstName,
      lastName: lastName,
    });
  }

  updateDOB(birthDate: string): Promise<any> {
    return this.userProfile.update({
      birthDate: birthDate,
    });
  }

  updateEmail(newEmail: string, password: string): firebase.Promise<any> {
    const credential = firebase.auth.EmailAuthProvider
      .credential(this.currentUser.email, password);

    return this.currentUser.reauthenticateWithCredential(credential).then(user => {
      this.currentUser.updateEmail(newEmail).then(user => {
        this.userProfile.update({email: newEmail});
      });
    });
  }

  updatePassword(newPassword: string, oldPassword: string): firebase.Promise<any> {
    const credential = firebase.auth.EmailAuthProvider
      .credential(this.currentUser.email, oldPassword);

    return this.currentUser.reauthenticateWithCredential(credential).then(user => {
      this.currentUser.updatePassword(newPassword).then(user => {
        console.log("Password Changed");
      }, error => {
        console.log(error);
      });
    });
  }
}
