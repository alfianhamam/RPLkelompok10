import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user_service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-uploadpic',
  templateUrl: './uploadpic.page.html',
  styleUrls: ['./uploadpic.page.scss'],
})
export class UploadpicPage implements OnInit {

  profilePic: string;

  constructor(
    public http: Http,
    public route: Router,
    public afStore: AngularFirestore,
    public user: UserService,
    public toastCtrl: ToastController
  ) { }

  ngOnInit() {
  }

  confirmPicture() {
    const profilePic = this.profilePic

    this.afStore.doc(`users/${this.user.getUID()}`).update({
      profilePic
    })
    this.showToast('Image has been uploaded successfully');
    this.route.navigate(['tabs/profile']);
  }

  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }

  fileChanged(event) {
    const files = event.target.files

    const data = new FormData()
    data.append('file', files[0])
    data.append('UPLOADCARE_STORE', '1')
    data.append('UPLOADCARE_PUB_KEY', 'a0a379bbb9c527801555')

    this.http.post('https://upload.uploadcare.com/base/', data)
      .subscribe(event => {
        console.log(event)
        this.profilePic = event.json().file
      })
  }
}
