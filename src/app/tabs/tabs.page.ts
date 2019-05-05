import { AlertController } from '@ionic/angular';
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
    public alert: AlertController
  ) { }

  ngOnInit() {
  }

  async showalert(message: string){
    const  alert = await this.alert.create({
      message,
      buttons : ['OK']
    })

    await alert.present()
  }

  verifAuth(){
    if(this.authGuard.canActivate()===false){
      this.showalert('Please login to see your profile');
      this.route.navigate(['login'])
    }
  }

}
