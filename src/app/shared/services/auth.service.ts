import {Injectable} from '@angular/core';

import * as firebase from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import {observable, Observable, of} from 'rxjs';
import {auth} from 'firebase/app';
import {map, switchMap} from 'rxjs/operators';
import {AngularFireDatabase} from '@angular/fire/database';
import {CurrentUser} from '../classes/current-user';


@Injectable()
export class AuthService {

  public user$: Observable<CurrentUser>;
  public currentUser: CurrentUser
  public userEmail: string


  constructor(private firebaseAuth: AngularFireAuth, private firebase: AngularFireDatabase,) {
    this.checkLogin()
  }

  checkLogin(){
    if (this.currentUser != undefined){
      return of(this.currentUser)
    }
    return this.user$ = this.firebaseAuth.authState.pipe(
      map(user=> this.userEmail = user.email),
      switchMap(()=> {
        return  this.getAdmins()
      }),
      switchMap(admins=>{
        this.checkUserIsAdmin(admins,this.userEmail)
        return of(this.currentUser)
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

  // checkUserIsAdmin(userEmail){
  //     return this.firebase.database.ref().child('admins').orderByChild('email').equalTo(userEmail).on('value', snapshot =>{
  //       this.currentUser = new CurrentUser({'email':userEmail,'isAdmin': snapshot.exists()})
  //    })
  // }

  getAdmins(){
    return this.firebase.list('admins').valueChanges()
  }

  checkUserIsAdmin(list, userEmail){
      if (list.includes(userEmail)) {
         this.currentUser = new CurrentUser({'email': userEmail, 'isAdmin': true})
      }
      else {
         this.currentUser = new CurrentUser({'email': userEmail, 'isAdmin': false})
      }
    }
}
