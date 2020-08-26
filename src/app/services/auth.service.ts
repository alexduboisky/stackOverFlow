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
    return this.firebaseAuth.auth.createUserWithEmailAndPassword(email, password)
  }

  login(email: string, password: string){
    return this.firebaseAuth.auth.signInWithEmailAndPassword(email, password)
  }

  logout() {
    this.firebaseAuth
      .auth
      .signOut().then(() => {
        this.router.navigate(['login'])
    });
  }

}
