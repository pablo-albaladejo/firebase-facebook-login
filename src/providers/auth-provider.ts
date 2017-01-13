import { Injectable } from '@angular/core';

import { AngularFire, FirebaseAuthState, AuthProviders, AuthMethods } from 'angularfire2';

import { Platform } from 'ionic-angular';
import { Facebook } from 'ionic-native';

import firebase from 'firebase';

@Injectable()
export class AuthProvider{
  private authState: FirebaseAuthState;

  constructor(public af:AngularFire, private platform: Platform) {
    this.authState = this.af.auth.getAuth();
      this.af.auth.subscribe((state: FirebaseAuthState) => {
        this.authState = state;
      });

  }
  

  /* Common */

  getCurrentUid(){
    return this.authState.auth.uid;
  }

  logout() {
      this.af.auth.logout();
  }

  /* Email & Password */

  signin() {   
    return this.af.auth.login({
      provider: AuthProviders.Password,
      method: AuthMethods.Password
    });
  }
  
  createAccount(credentails) {
    return this.af.auth.createUser(credentails);
  };
  
  /* Facebook */
  //https://github.com/angular/angularfire2/issues/736
  signInWithFacebook(): firebase.Promise<FirebaseAuthState> {
    if (this.platform.is('cordova')) {
      return Facebook.login(['email', 'public_profile']).then(res => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        return firebase.auth().signInWithCredential(facebookCredential);
      });
    } else {
      return this.af.auth.login({
        provider: AuthProviders.Facebook,
        method: AuthMethods.Popup
      });
    }
  }

  getFacebookName(): string {
      if (this.authState != null) {
        return this.authState.facebook.displayName;
      } else {
        return '';
      }
    }

}