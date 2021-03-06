import { AuthenticationService } from './../authentication.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UserService } from './../user_service';
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  mainuser: AngularFirestoreDocument
  sub
  userinfo

  constructor(
      public http: Http,
      public afs: AngularFirestore,
      private route: Router,
      private alert: AlertController,
      public user: UserService,
      public afAuth: AngularFireAuth,
      private authService: AuthenticationService
  ) {
      
  }

  ngOnInit() {
    this.mainuser = this.afs.doc(`users/${this.user.getUID()}`)
      this.mainuser.valueChanges().subscribe(event => {
          this.userinfo = event
      })
  }

  gotoedit(){
    this.route.navigate(['edit-profile'])
  }

  updatepic(){
    this.route.navigate(['uploadpic'])
  }

  signout(){
      this.afAuth.auth.signOut().then(() =>{
        this.authService.logout();
        this.route.navigate(['']);
      })
  }

}
