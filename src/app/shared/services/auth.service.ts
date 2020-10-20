import {Injectable} from '@angular/core';

import * as firebase from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import {observable, Observable, of} from 'rxjs';
import {auth} from 'firebase/app';
import {map, switchMap} from 'rxjs/operators';
import {AngularFireDatabase} from '@angular/fire/database';


@Injectable()
export class AuthService {

  public user: Observable<firebase.User>;
  public userEmail: string
  public isAdmin: boolean = false

  public adminList: string[] = []


  constructor(private firebaseAuth: AngularFireAuth, private firebase: AngularFireDatabase,) {

    this.user = this.firebaseAuth.authState.pipe(
      map(user=> {
        this.userEmail = user && user.email
        return user
      })
    )
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

  checkUserIsAdmin(userEmail){
      this.firebase.database.ref().child('admins').orderByChild('email').equalTo(userEmail).on('value', snapshot =>{
      this.isAdmin = snapshot.exists();
    })
  }
}
