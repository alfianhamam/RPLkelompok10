import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(
    private route:Router
  ) { }

  ngOnInit() {
  }

  gologin(){
    this.route.navigate(['login']);
  }

}
