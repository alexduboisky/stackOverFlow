import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';



@Injectable()
export class AuthService {

  public user: Observable<firebase.User>;

  constructor(private firebaseAuth: AngularFireAuth, private router: Router) {
    this.user = firebaseAuth.authState;
  }


  signup(email: string, password: string) {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then( () => {
        this.router.navigate(['/'])
      })
      .catch(err => {
        console.log(err)
      });
  }

  login(email: string, password: string){
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.router.navigate(['/'])
      })
      .catch(err => {
        console.log(err)
      });
  }

  logout() {
    this.firebaseAuth
      .auth
      .signOut().then(() => {
        this.router.navigate(['login'])
    });
  }

}
