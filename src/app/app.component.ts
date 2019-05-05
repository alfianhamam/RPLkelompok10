import { AuthenticationService } from './authentication.service';
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  public appMenu = [
      {title: 'My Profile' , url: '/profile', icon: 'people'},
      {title: 'My Event' , url: '/event', icon: 'list-box'},
      {title: 'Reminder' , url: '/test3', icon: 'notifications'},
      {title: 'Setting' , url: '/test3', icon: 'settings'}
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.authService.authenticationState.subscribe(state =>{
        console.log('Auth Changed :', state);
        if(state){
          this.router.navigate(['']);
        }
      });

    });
    this.authService.setfalse();
  }
}
