import { Component, OnInit } from '@angular/core';
import * as questions from '../../../../assets/data/questions.json';
import {AuthService} from '../../../shared/services/auth.service';
import * as category from '../../../../assets/data/category.json';

@Component({
  selector: 'app-all-questions',
  templateUrl: './all-questions.component.html',
  styleUrls: ['./all-questions.component.scss']
})
export class AllQuestionsComponent implements OnInit {

  questionsList: object

  userName: string
  categoryList: object

  constructor(auth: AuthService){
    auth.user.subscribe((user)=>{
      if (user){
        this.userName = user.email
      }
    },error => {
      console.log('some errors',error)
    })
  }

  ngOnInit(): void {
    this.questionsList = questions.questions
    this.categoryList = category.category
  }
}
