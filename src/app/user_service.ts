import { Injectable } from '@angular/core';

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

    constructor(){

    }

    setUser(user: user){
        this.user = user
    }

    getUID(){
        return this.user.uid
    }
}