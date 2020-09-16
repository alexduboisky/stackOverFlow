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
  questionComment: AngularFireList<object> = null

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
    this.questionComment = this.db.list(path)
    return this.questionComment.push(comment)
  }

}
