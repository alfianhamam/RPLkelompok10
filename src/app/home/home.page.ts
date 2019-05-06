import { EventService } from './../event.service';
import { AuthenticationService } from './../authentication.service';
import { AuthGuardService } from './../auth-guard.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  state;
  items: Observable<any[]>

  constructor(
    private route: Router,
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore,
    public authGuard : AuthGuardService,
    public alert: AlertController,
    public authService: AuthenticationService,
    private eventService: EventService
    ){
      this.authService.authenticationState.subscribe(state =>{
        this.state = state
      })
      this.items = afs.collection('event').valueChanges();
      console.log(this.items)
  }

  gotoEvent(item){
    this.eventService.currentEvent = item;
    this.route.navigate(['event']);
  }

  gosearch(){
    this.route.navigate(['search']);
  }

  goprofile(){
    this.route.navigate(['profile']);
  }

  gohome(){
    this.route.navigate(['home']);
  }

  async showalert(message: string){
    const  alert = await this.alert.create({
      message,
      buttons : ['OK']
    })

    await alert.present()
  }

  gotoCreateEvent(){
    if(this.authGuard.canActivate()===false){
      this.route.navigate(['login']);
      this.showalert('Please login to make your own event');
    }else{
      this.route.navigate(['create-event']);
    }
  }

  signout(){
    this.afAuth.auth.signOut().then(() =>{
      this.authService.logout();
      this.route.navigate(['']);
    })
  }

  signin(){
    this.route.navigate(['login']);
  }
}

