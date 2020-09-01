import { Component, OnInit } from '@angular/core';
import * as questions from '../../../../assets/data/questions.json';

@Component({
  selector: 'app-all-questions',
  templateUrl: './all-questions.component.html',
  styleUrls: ['./all-questions.component.scss']
})
export class AllQuestionsComponent implements OnInit {

  questionsList: object

  constructor() { }

  ngOnInit(): void {
    this.questionsList = questions.questions
  }
}
