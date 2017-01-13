import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth-provider';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  uid: any;
  name: any;

  constructor(public navCtrl: NavController,
              public auth:AuthProvider
              ) 
  {

  }

  ngOnInit(){
    this.uid = this.auth.getCurrentUid();
    this.name = this.auth.getFacebookName();
  }

  logout() {
      this.auth.logout();
  }

}
