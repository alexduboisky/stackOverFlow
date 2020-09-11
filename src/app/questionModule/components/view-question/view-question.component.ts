import { Component, OnInit } from '@angular/core';
import {DatabaseService} from '../../../shared/services/database.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-view-question',
  templateUrl: './view-question.component.html',
  styleUrls: ['./view-question.component.scss']
})
export class ViewQuestionComponent implements OnInit {

  currentQuestion: object

  constructor(private firebaseService: DatabaseService, private router: Router) {
    if (this.firebaseService.currentQuestion!=undefined){
      this.currentQuestion = this.firebaseService.currentQuestion
    }
    else {
      this.getPost(`/questions/${this.router.url.split('/').reverse()[0]}`)
    }
  }

  ngOnInit(): void {
  }

  getPost(path){
    this.firebaseService.getPost(path).snapshotChanges().pipe()
      .subscribe(question=>
      this.currentQuestion = question.payload)
  }
}
