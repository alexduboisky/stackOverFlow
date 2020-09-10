import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import {Question} from '../classes/question';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private dbPath = '/questions'

  questionsRef: AngularFireList<Question> = null;

  constructor(private db: AngularFireDatabase) {
    this.questionsRef = db.list(this.dbPath)
  }

  createPost(question: Question): firebase.database.ThenableReference{
    return this.questionsRef.push(question)
  }

  getPostsList(): AngularFireList<Question>{
    return  this.questionsRef
  }
}
