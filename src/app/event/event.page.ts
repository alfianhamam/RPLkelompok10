import { ToastController } from '@ionic/angular';
import { AuthenticationService } from './../authentication.service';
import { Router } from '@angular/router';
import { EventService } from './../event.service';
import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {
  state;
  dt_event;

  constructor(
    public http: Http,
    private eventService: EventService,
    public route: Router,
    public authService: AuthenticationService,
    public toastCtrl: ToastController
  ) { }

  ngOnInit(){
    this.dt_event = this.eventService.currentEvent;
    console.log(this.eventService.currentEvent);
    this.authService.authenticationState.subscribe(state =>{
      this.state = state
    })
  }

  gotoForm(){
    if(this.state == true){
      this.route.navigate(['form-event']);
    }else{
      this.showToast('Please login to join this event')
      this.route.navigate(['login']);
    }
    
  }

  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }


}
