import { UserService } from './../user_service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  nama: string = ""
  alamat: string = ""
  no_hp: string = ""
  email:string = ""
  password:string = ""

  constructor(
    private route:Router,
    public afAuth: AngularFireAuth,
    public alert: AlertController,
    public user:UserService
  ) { }

  ngOnInit() {
  }

  goregist(){
    this.route.navigate(['register']);
  }

  async login(){
    const { nama, alamat, no_hp, email, password } = this
    try{
        const res = await this.afAuth.auth.signInWithEmailAndPassword(email, password)
        
        if(res.user){
          this.user.setUser({
           nama,
           alamat,
           no_hp,
           email,
           password,
           uid: res.user.uid
          })

          this.route.navigate(['']);
        }

        this.showalert("Success", "Welcome")
        
    } catch(err) {
        console.dir(err)
        if(err.code === "auth/user-not-found"){
          console.log("User not found")
          this.showalert("Error", "User not found")
        }
    }
  }

  async showalert(header: string, message: string){
    const  alert = await this.alert.create({
      header,
      message,
      buttons : ['OK']
    })

    await alert.present()
}


}
