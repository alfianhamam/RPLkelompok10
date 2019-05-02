import { UserService } from './../user_service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Http } from '@angular/http';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  mainuser: AngularFirestoreDocument
  sub
  nama: string
  alamat: string
  no_hp: string
  email: string
  password: string
  newpassword: string
  profilePic: string

  busy: boolean = false

  constructor(
    private http: Http,
    private afs: AngularFirestore,
    private route: Router,
    private alert: AlertController,
    private user: UserService
  ) {
    this.mainuser = afs.doc(`users/${user.getUID()}`)
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

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

  async showAlert(title: string, content: string) {
    const alert = await this.alert.create({
      header: title,
      message: content,
      buttons: ['OK']
    })

    await alert.present()
  }

  async updateDetails() {
    this.busy = true

    if (!this.password) {
      this.busy = false
      return this.showAlert('Error!', 'You have to enter a password')
    }

    try {
      await this.user.reAuth(this.user.getEmail(), this.password)
    } catch (error) {
      this.busy = false
      return this.showAlert('Error!', 'Wrong Password')
    }

    if (this.newpassword) {
      await this.user.updatePassword(this.newpassword)
    }

    if (this.email !== this.user.getEmail()) {
      await this.user.updateEmail(this.email)
      this.mainuser.update({
        email: this.email
      })
    }

    if (this.nama !== this.user.getNama()) {
      await this.user.updateNama(this.nama)
      this.mainuser.update({
        nama: this.nama
      })
    }

    if (this.alamat !== this.user.getAlamat()) {
      await this.user.updateAlamat(this.alamat)
      this.mainuser.update({
        alamat: this.alamat
      })
    }

    if (this.no_hp !== this.user.getNo_hp()) {
      await this.user.updateNo_hp(this.no_hp)
      this.mainuser.update({
        no_hp: this.no_hp
      })
    }

    this.password = ""
    this.newpassword = ""
    this.busy = false

    await this.showAlert('Done!','Your profile was updated!')

    this.route.navigate(['tabs/profile'])
  }
}
