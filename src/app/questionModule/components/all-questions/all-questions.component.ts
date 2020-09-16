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

  userName: string
  categoryList = []

  constructor(private auth: AuthService, private firebaseService: DatabaseService, private router: Router){
    this.userName = auth.userEmail
  }

  ngOnInit(): void {
    this.getPostsList()
    this.categoryList = category.category
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
}
