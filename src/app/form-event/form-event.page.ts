import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from './../user_service';
import { EventService } from './../event.service';
import { Component, OnInit } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase';

@Component({
  selector: 'app-form-event',
  templateUrl: './form-event.page.html',
  styleUrls: ['./form-event.page.scss'],
})
export class FormEventPage implements OnInit {

  dt_event;
  mainuser: AngularFirestoreDocument
  sub
  nama: string
  alamat: string
  no_hp: string
  email: string
  profilePic: string
  
  constructor(
    private eventService: EventService,
    private afs: AngularFirestore,
    private user: UserService,
    private route: Router,
    public toastCtrl: ToastController
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
    this.dt_event = this.eventService.currentEvent;
    console.log(this.eventService.currentEvent);
  }

  submition(){
    const poster = this.dt_event.poster
    const nama = this.dt_event.namaEvent
    const harga = this.dt_event.harga
    const contact = this.dt_event.author

    this.afs.doc(`users/${this.user.getUID()}`).update({
      registered_event: firestore.FieldValue.arrayUnion({
        poster,
        nama,
        harga,
        contact
      })
    });

    this.afs.doc(`event/${this.dt_event.poster}`).update({
      participants: firestore.FieldValue.arrayUnion(this.user.getUID())
    })

    this.route.navigate(['tabs','home']);
    this.showToast('Success join the event')
  }

  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }

}
