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

}

