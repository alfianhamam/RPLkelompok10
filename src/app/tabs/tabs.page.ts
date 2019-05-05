import { AlertController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuardService } from '../auth-guard.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  constructor(
    public afAuth: AngularFireAuth,
    private route: Router,
    private authGuard : AuthGuardService,
    public alert: AlertController,
    public toastCtrl: ToastController
  ) { }

  ngOnInit() {
  }

  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }

  verifAuth(){
    if(this.authGuard.canActivate()===false){
      this.route.navigate(['login']);
      this.showToast('Please login to see your profile');
    }
  }

}
