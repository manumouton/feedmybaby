import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

import {AngularFireAuth} from 'angularfire2/auth';
import {User} from "firebase/app";
import {UserProfileProvider} from "../firebase/userProfileProvider";

@Injectable()
export class AuthProvider {
  public user: Observable<User>;

  constructor(public http: Http,
              private angularFireAuth: AngularFireAuth,
              private userProfileProvider: UserProfileProvider) {
    this.user = this.angularFireAuth.authState;
  }

  loginUser(email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.angularFireAuth
        .auth
        .signInWithEmailAndPassword(email, password)
        .then((val: any) => resolve())
        .catch((err: any) => reject(err))
    });
  }

  signupUser(email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.angularFireAuth
        .auth
        .createUserWithEmailAndPassword(email, password)
        .then((val: any) => resolve())
        .then(user => this.userProfileProvider.createUserProfile(user, email))
        .catch((err: any) => reject(err))
    });
  }

  resetPassword(email: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.angularFireAuth
        .auth
        .sendPasswordResetEmail(email)
        .then((val: any) => resolve())
        .catch((err: any) => reject(err))
    });
  }

  logoutUser(): Promise<any> {
    //TODO disconnect
    // this.userProfileProvider.disconnectUser(this.user.uid);

    return new Promise((resolve, reject) => {
      this.angularFireAuth
        .auth
        .signOut()
        .then((val: any) => resolve())
        .catch((err: any) => reject(err))
    });
  }
}
