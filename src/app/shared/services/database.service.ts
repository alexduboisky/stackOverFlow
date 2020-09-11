import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import {Question} from '../classes/question';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private dbPath = '/questions'
  public currentQuestion: any

  questionsRef: AngularFireList<Question> = null;
  questionObj : AngularFireObject<Question> = null

  constructor(private db: AngularFireDatabase) {
    this.questionsRef = db.list(this.dbPath)
  }

  createPost(question: Question): firebase.database.ThenableReference{
    return this.questionsRef.push(question)
  }

  getPostsList(): AngularFireList<Question>{
    return  this.questionsRef
  }
  getPost(path): AngularFireObject<Question>{
    this.questionObj = this.db.object(path)
    return  this.questionObj
  }

}
