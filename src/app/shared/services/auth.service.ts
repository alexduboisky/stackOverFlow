import {Injectable} from '@angular/core';

import * as firebase from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable} from 'rxjs';
import {auth} from 'firebase/app';
import {map} from 'rxjs/operators';


@Injectable()
export class AuthService {

  public user: Observable<firebase.User>;
  public userEmail: string


  constructor(private firebaseAuth: AngularFireAuth) {
    this.user = firebaseAuth.authState.pipe(map(user=>{
      this.userEmail = user && user.email
      return user
    }));
  }


  signup(email: string, password: string) {
    return this.firebaseAuth.auth.createUserWithEmailAndPassword(email, password)
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
