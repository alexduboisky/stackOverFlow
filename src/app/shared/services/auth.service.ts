import {Injectable} from '@angular/core';

import * as firebase from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import {forkJoin, observable, Observable, of, pipe} from 'rxjs';
import {auth} from 'firebase/app';
import {map, mergeMap, switchMap} from 'rxjs/operators';
import {AngularFireDatabase} from '@angular/fire/database';
import {CurrentUser} from '../classes/current-user';


@Injectable()
export class AuthService {

  public user$: Observable<CurrentUser>;
  public currentUser: CurrentUser
  public userEmail: string


  constructor(private firebaseAuth: AngularFireAuth, private firebase: AngularFireDatabase,) {
    this.user$ = this.firebaseAuth.authState.pipe(
      map(user=> {
        this.currentUser = user ? new CurrentUser({'email': user.email, 'isAdmin': false}) : null;
        console.log(this.currentUser)
        return this.currentUser
      })
    )
  }

  checkLogin(){
    if (this.currentUser){
      return of(this.currentUser)
    }
    return forkJoin({
      users: this.user$,
      admins: this.getAdmins()
    }).pipe(
      map(dataArr=>{
        console.log(dataArr)
        if (this.currentUser) {
          this.checkUserIsAdmin(dataArr.admins, this.currentUser.email)
        }
        return this.currentUser
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

  loginWithMicrosoft(){
    const  provider = new auth.OAuthProvider('microsoft.com');
    return this.firebaseAuth.auth.signInWithPopup(provider)
  }

  logout() {
    return this.firebaseAuth.auth.signOut();
  }

  getAdmins(){
    return this.firebase.list('admins').valueChanges().pipe(
      map(value => {
        console.log(value)
        return value
      })
    )
  }

  checkUserIsAdmin(list, userEmail){
      this.currentUser.isAdmin = list.includes(userEmail);
    }
}
