import {Injectable} from '@angular/core';

import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs';
import {auth} from 'firebase';


@Injectable()
export class AuthService {

  public user: Observable<firebase.User>;


  constructor(private firebaseAuth: AngularFireAuth) {
    this.user = firebaseAuth.authState;
  }


  signup(email: string, password: string) {
    return this.firebaseAuth.auth.createUserWithEmailAndPassword(email, password)
  }

  signupWithGoogle(){
    return this.firebaseAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
  }

  login(email: string, password: string){
    return this.firebaseAuth.auth.signInWithEmailAndPassword(email, password)
  }

  async loginWithGoogle(){
    const provider = new auth.GoogleAuthProvider();
    return await this.firebaseAuth.auth.signInWithPopup(provider)
  }

  async loginWithGitHub(){
    const  provider = new auth.GithubAuthProvider();
    return await this.firebaseAuth.auth.signInWithPopup(provider)
  }

  async loginWithMicrosoft(){
    const  provider = new auth.OAuthProvider('microsoft.com');
    return await this.firebaseAuth.auth.signInWithPopup(provider)
  }

  logout() {
    return this.firebaseAuth.auth.signOut()
  }

}
