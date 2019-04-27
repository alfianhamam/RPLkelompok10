import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  constructor(
    private route: Router){
  }

  gologin(){
    this.route.navigate(['login']);
  }

  goevent(){
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

}

