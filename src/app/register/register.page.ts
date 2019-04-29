import { UserService } from './../user_service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore'

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  nama: string = ""
  alamat: string = ""
  no_hp: string = ""
  email: string = ""
  password: string = ""
  cpassword: string = ""


  constructor(
    private route:Router,
    public afAuth: AngularFireAuth,
    public alert: AlertController,
    public user: UserService,
    public afstore: AngularFirestore
  ) { }

  ngOnInit() {
  }


  async register(){
    const { nama, alamat, no_hp, email, password, cpassword } = this
    if (password != cpassword){
        this.showalert("Error", "Password don't match")
        return console.error("Password don't match")
    }

    try {
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      
      this.afstore.doc(`users/${res.user.uid}`).set({
        nama,
        alamat,
        no_hp,
        email,
        password
      })

      this.user.setUser({
        nama,
        alamat,
        no_hp,
        email,
        password,
        uid: res.user.uid
       })

      this.showalert("Success", "You are registered!")
      this.route.navigate(['login'])
    } catch(error){
        console.dir(error)
        this.showalert("Error", error.message)
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
