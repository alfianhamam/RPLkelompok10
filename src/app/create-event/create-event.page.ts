import { ToastController } from '@ionic/angular';
import { UserService } from './../user_service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { firestore } from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.page.html',
  styleUrls: ['./create-event.page.scss'],
})
export class CreateEventPage implements OnInit {

  imageURL: string
  namaEvent: string
  lokasi: string
  waktu: string
  deskripsi: string
  harga: string
  

  constructor(
    public http: Http,
    public afs: AngularFirestore,
    public user: UserService,
    public route: Router,
    public toastCtrl: ToastController
  ) { }

  ngOnInit() {
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
        this.imageURL = event.json().file
      })
  }

  submitEvent(){
    const imageURL = this.imageURL
    const namaEvent = this.namaEvent
    const lokasi = this.lokasi
    const waktu = this.waktu 
    const deskripsi = this.deskripsi
    const harga = this.harga

    this.afs.doc(`users/${this.user.getUID()}`).update({
      event: firestore.FieldValue.arrayUnion(imageURL)
    })

    this.afs.doc(`event/${imageURL}`).set({
      namaEvent,
      lokasi,
      waktu,
      deskripsi,
      harga,
      author: this.user.getEmail(),
      poster: imageURL,
      participants: []
    })
    this.showToast('Event has been publish');
    this.route.navigate(['']);
  }

  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }

}
