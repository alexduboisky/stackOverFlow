import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../shared/services/auth.service';
import * as category from '../../../../assets/data/category.json';
import {DatabaseService} from '../../../shared/services/database.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-all-questions',
  templateUrl: './all-questions.component.html',
  styleUrls: ['./all-questions.component.scss']
})
export class AllQuestionsComponent implements OnInit {

  questionsList: object

  userName: string
  categoryList: object

  constructor(private auth: AuthService, private firebaseService: DatabaseService){
    auth.user.subscribe((user)=>{
      if (user){
        this.userName = user.email
      }
    },error => {
      console.log('some errors',error)
    })
  }

  ngOnInit(): void {
    this.getPostsList()
    this.categoryList = category.category
  }

  getPostsList() {
    this.firebaseService.getPostsList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(questions => {
      this.questionsList = questions;
    });
  }
}
