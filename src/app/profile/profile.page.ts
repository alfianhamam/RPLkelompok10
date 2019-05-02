import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UserService } from './../user_service';
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  mainuser: AngularFirestoreDocument
  sub
  nama: string
  alamat: string
  no_hp: string
  email: string
  profilePic: string

  constructor(
      public http: Http,
      private afs: AngularFirestore,
      private route: Router,
      private alert: AlertController,
      private user: UserService
  ) {
      this.mainuser= afs.doc(`users/${user.getUID()}`)
      this.sub = this.mainuser.valueChanges().subscribe(event => {
          this.nama = event.nama
          this.alamat = event.alamat
          this.no_hp = event.no_hp
          this.email = event.email
          this.profilePic = event.profilePic
      })
  }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.sub.unsubscribe()
  }

  gotoedit(){
    this.route.navigate(['edit-profile'])
  }

  updatepic(){
    this.route.navigate(['uploadpic'])
  }

}
