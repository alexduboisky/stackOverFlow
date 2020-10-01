import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import {Question} from '../classes/question';
import * as firebase from 'firebase';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private dbPath = '/questions'
  public currentQuestion: Question;

  questionsRef: AngularFireList<Question> = null;
  questionObj : AngularFireObject<Question> = null
  questionCommentObject: AngularFireList<object> = null

  constructor(private db: AngularFireDatabase) {
    this.questionsRef = db.list(this.dbPath)
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

}
