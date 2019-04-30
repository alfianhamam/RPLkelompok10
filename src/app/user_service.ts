import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators'
import { auth } from 'firebase/app';


interface user{
    nama: string,
    alamat: string,
    no_hp: string,
    email: string,
    password: string,
    uid: string,
}

@Injectable()
export class UserService{
    private user: user

    constructor(
        private afAuth: AngularFireAuth
    ){

    }

    setUser(user: user){
        this.user = user
    }

    getUID(): string{
        return this.user.uid
    }

    getNama(): string{
        return this.user.nama
    }

    getAlamat(): string{
        return this.user.alamat
    }

    getNo_hp(): string{
        return this.user.no_hp
    }

    getEmail(): string{
        return this.user.email
    }

    reAuth(email: string, password: string) {
		return this.afAuth.auth.currentUser.reauthenticateWithCredential(auth.EmailAuthProvider.credential(email, password))
    }
    
    updatePassword(newpassword: string){
        return this.afAuth.auth.currentUser.updatePassword(newpassword)
    }

    updateEmail(newemail: string){
        return this.afAuth.auth.currentUser.updateEmail(newemail)
    }

    updateAlamat(newalamat: string){
        return this.user.alamat = newalamat
    }

    updateNo_hp(newno_hp: string){
        return this.user.no_hp = newno_hp
    }

    updateNama(newnama: string){
        return this.user.nama = newnama
    }


}