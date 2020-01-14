import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';

import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})

export class AuthserviceService {
  userData: Observable<firebase.User>;
  fallado: boolean;

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private angularFireAuth: AngularFireAuth) {

    this.userData = angularFireAuth.authState;
  }

  doRegister(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
        .then(res => {
          resolve(res);
        }, err => reject(err))
    })
  }


  doLogin(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
        .then(res => {
          resolve(res);
        }, err => reject(err))
    })
  }



  // /* Sign up */
  // SignUp(email: string, password: string): boolean {
  //   this.fallado = true;

  //   this.angularFireAuth
  //     .auth
  //     .createUserWithEmailAndPassword(email, password)
  //     .then(res => {
  //       this.fallado = false;
  //     })
  //     .catch(error => {
  //     });

  //   return this.fallado;

  // }

  /* Sign in */
  SignIn(email: string, password: string): boolean {

    this.fallado = true;

    this.angularFireAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        this.fallado = false;
      })
      .catch(function (error) {
      });

    return this.fallado;
  }

  /* Sign out */
  SignOut() {
    this.angularFireAuth
      .auth
      .signOut();
  }

}

