import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  constructor(
    public afAuth: AngularFireAuth,
    private route: Router
  ) { }

  ngOnInit() {
  }

  gotologin(){
      this.route.navigate(['login'])
  }

}
