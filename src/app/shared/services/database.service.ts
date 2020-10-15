import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import {Question} from '../classes/question';
import * as firebase from 'firebase';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private dbPath = '/questions'
  private adminsPath = '/admins'
  public currentQuestion: Question;

  questionsRef: AngularFireList<Question> = null;
  questionObj : AngularFireObject<Question> = null
  questionCommentObject: AngularFireList<object> = null
  adminsRef: AngularFireObject<any> = null;

  public isAdmin: boolean = false
  public adminList: string[] = []

  constructor(private db: AngularFireDatabase, public authService: AuthService) {
    this.questionsRef = db.list(this.dbPath)
    this.adminsRef = db.object(this.adminsPath)
    this.getAdmins()
  }

  createPost(question: Question): firebase.database.ThenableReference{
    return this.questionsRef.push(question)
  }

  getPostsList(): Observable<Question[]>{
    return  this.questionsRef.snapshotChanges().pipe(
      map(changes  =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    )
  }

  getPost(path): AngularFireObject<Question>{
    this.questionObj = this.db.object(path)
    return  this.questionObj
  }

  addComment(comment: object, path: string){
    this.questionCommentObject = this.db.list(path)
    return this.questionCommentObject.push(comment)
  }

  updatePost(key: string, value: object): Promise<void> {
    return this.questionsRef.update(key, value);
  }

  updateComment(path: string, key: string, value: object): Promise<void>{
    this.questionCommentObject = this.db.list(path)
    return this.questionCommentObject.update(key, value)
  }

  deletePost(key: string): Promise<void>{
    return this.questionsRef.remove(key)
  }

  getAdmins(){
    this.adminsRef.valueChanges().subscribe(admins => {
      this.adminList = admins;
      this.checkIsAdmin(this.adminList, this.authService.userEmail)
  })}

  checkIsAdmin(adminList: string[], currentUser: string) {
    adminList.forEach(admin => {
      if (admin === currentUser) {
        this.isAdmin = true
      }
    })
  }

}
