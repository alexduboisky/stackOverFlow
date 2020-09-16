import { Component, OnInit } from '@angular/core';
import {DatabaseService} from '../../../shared/services/database.service';
import {Router} from '@angular/router';
import {Question} from '../../../shared/classes/question';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../shared/services/auth.service';


@Component({
  selector: 'app-view-question',
  templateUrl: './view-question.component.html',
  styleUrls: ['./view-question.component.scss']
})
export class ViewQuestionComponent implements OnInit {

  public currentQuestion: Question
  public object: any;
  public isLoading: boolean = false
  form: FormGroup
  dbPath: string
  commentsKeys: string[] = []

  constructor(private firebaseService: DatabaseService, private router: Router, private user: AuthService) {
    this.dbPath = this.router.url.split('/').reverse()[0]

  }
 // back from page
  ngOnInit(): void {
    if (!this.firebaseService.currentQuestion) {
      this.getPost(`/questions/${this.dbPath}`)
    } else {
      this.currentQuestion = this.firebaseService.currentQuestion
      this.isLoading = true
      this.getCommentsKeys(this.currentQuestion.comments)
    }
    this.form = new FormGroup({
      comment: new FormControl(null,[Validators.required])
    })
  }

  getPost(path){
    this.firebaseService.getPost(path).valueChanges()
      .subscribe(question=>
      {
        this.currentQuestion = question
        this.isLoading = true
        this.getCommentsKeys(this.currentQuestion.comments)
      })

  }

  // this.currentQuestion = this.firebaseService.currentQuestion
  //       this.isLoading = true
  //       this.getCommentsKeys(this.currentQuestion.comments)
  addAnswer() {
    this.firebaseService.addComment(
      {
        author:this.user.userEmail,
        text:this.form.controls.comment.value,
        date: new Date().getTime()
      },
      `/questions/${this.dbPath}/comments`).then(a=>console.log(a))
    this.form.reset()
  }

  getCommentsKeys(obj: object){

    this.commentsKeys = []

    for (const commentKey in obj) {
      if (obj.hasOwnProperty(commentKey)){
        this.commentsKeys.push(commentKey)
      }
    }
  }
}
