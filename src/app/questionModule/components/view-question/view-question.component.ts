import { Component, OnInit } from '@angular/core';
import {DatabaseService} from '../../../shared/services/database.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Question} from '../../../shared/classes/question';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../shared/services/auth.service';
import {switchMap} from 'rxjs/operators';


@Component({
  selector: 'app-view-question',
  templateUrl: './view-question.component.html',
  styleUrls: ['./view-question.component.scss']
})
export class ViewQuestionComponent implements OnInit {

  public currentQuestion: Question
  public currentAnswer: object;
  public isLoading: boolean = false
  public userEmail: string
  form: FormGroup
  dbPath: string
  commentsKeys: string[] = []
  public isAdmin: boolean;

  constructor(public PostService: DatabaseService, private router: Router, private authService: AuthService, currentRout: ActivatedRoute) {
    currentRout.url.subscribe(route=>{
      this.dbPath = route[1].path
    })
  }

  ngOnInit(): void {
    if (!this.PostService.currentQuestion) {
      this.authService.user$.pipe()
      this.getPost(`/questions/${this.dbPath}`)
    } else {
      this.setCurrentQuestion(this.PostService.currentQuestion)
    }
    this.form = new FormGroup({
      comment: new FormControl(null,[Validators.required])
    })
  }

  getPost(path){
    this.authService.user$.pipe(
      switchMap(()=>this.PostService.getPost(path).valueChanges())
    )
      .subscribe(question=>
      {
        this.setCurrentQuestion(question)
      })

  }

  backToAllQuestions(){
    this.router.navigate(['questions'])
  }

  setCurrentQuestion(question){
    this.currentQuestion = question
    this.isLoading = true
    this.getCommentsKeys(this.currentQuestion.comments)
    this.userEmail = this.authService.currentUser.email
    this.isAdmin = this.authService.currentUser.isAdmin
  }

  addAnswer() {
    this.currentAnswer = {
      author:this.authService.userEmail,
      date: new Date().getTime(),
      text:this.form.controls.comment.value,
      right: false
    }
    this.PostService.addComment(
      this.currentAnswer,
      `/questions/${this.dbPath}/comments`)
      .then(commentKey => {
        this.PostService.getPost(this.dbPath)
        this.currentQuestion.comments[commentKey.key] = this.currentAnswer
        this.getCommentsKeys(this.currentQuestion.comments)
      })
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

  generateCommentObjForCurrentQuestion(commentKey: string, fields: object){
    let newComment: object = {
      commentKey: {fields}
    };
    return newComment
  }

  toggleRight($event: Event, key: string) {
    this.currentQuestion.comments[key].right = $event.target['checked']
    this.PostService.updateComment(`/questions/${this.dbPath}/comments`,key,{right: $event.target['checked']})
    this.PostService.updatePost(this.dbPath,{solved: $event.target['checked']})
  }

  editQuestion(question) {
    this.router.navigate([`/editQuestion/${this.dbPath}`])
    this.PostService.currentQuestion = question
  }

  approveQuestion(key: string) {
    this.PostService.updatePost(key, {'approved': true}).then(() => {
      this.currentQuestion.approved = true
    })
  }

  deleteQuestion(key: string) {
    this.PostService.deletePost(key)
    this.backToAllQuestions();
  }
}
