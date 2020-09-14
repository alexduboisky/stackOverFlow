import { Component, OnInit } from '@angular/core';
import {DatabaseService} from '../../../shared/services/database.service';
import {Router} from '@angular/router';
import {Question} from '../../../shared/classes/question';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

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

  constructor(private firebaseService: DatabaseService, private router: Router,private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    if (this.firebaseService.currentQuestion == undefined) {
      this.getPost(`/questions/${this.router.url.split('/').reverse()[0]}`)
    } else {
      this.currentQuestion = this.firebaseService.currentQuestion
      this.isLoading = true
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
      })

  }

  addAnswer() {
    console.log(this.form.controls.comment.value)
  }
}
