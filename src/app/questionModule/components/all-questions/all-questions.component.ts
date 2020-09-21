import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../shared/services/auth.service';
import * as category from '../../../../assets/data/category.json';
import {DatabaseService} from '../../../shared/services/database.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-all-questions',
  templateUrl: './all-questions.component.html',
  styleUrls: ['./all-questions.component.scss']
})
export class AllQuestionsComponent implements OnInit {

  public questionsList = []
  public isLoading: boolean = false

  public userName: string
  categoryList = []

  constructor(public auth: AuthService, private firebaseService: DatabaseService, private router: Router){
  }

  ngOnInit(): void {
    this.getPostsList()
    this.categoryList = category.category
    this.userName = this.auth.userEmail
  }

  getPostsList() {
    this.firebaseService.getPostsList().subscribe(questions => {
      this.questionsList = questions;
      this.isLoading = true
    });
  }

  setCurrentQuestion(question) {
    this.router.navigate(['/viewQuestion',question.key])
    this.firebaseService.currentQuestion = question
  }

  editQuestion(question) {
    this.router.navigate(['/editQuestion',question.key])
    this.firebaseService.currentQuestion = question
  }
}
