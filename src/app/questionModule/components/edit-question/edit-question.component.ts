import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {AuthService} from '../../../shared/services/auth.service';
import {DatabaseService} from '../../../shared/services/database.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as category from '../../../../assets/data/category.json';
import {Question} from '../../../shared/classes/question';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.scss']
})
export class EditQuestionComponent implements OnInit {

  form: FormGroup
  categoryList: any[] = []
  checkedCategory: any[] = []
  dbPath: string
  public currentQuestion: Question
  public isLoading: boolean = false

  get categoryFormArray() {
    return this.form.controls.category as FormArray;
  }

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private firebaseService: DatabaseService, private router: Router, currentRout: ActivatedRoute) {
    currentRout.url.subscribe(route=>{
      this.dbPath = route[1].path
      if (!this.firebaseService.currentQuestion) {
        this.getPost(`/questions/${this.dbPath}`)
      } else {
        this.setCurrentQuestion(this.firebaseService.currentQuestion)
      }
    })
  }

  setCurrentQuestion(question){
    this.currentQuestion = question
    this.isLoading = true
    this.createForm(this.currentQuestion);
  }

  ngOnInit(): void {
  }

  createForm(question){
    this.categoryList = category.category
    this.form = this.formBuilder.group(
      {title: new FormControl(question.title,[
          Validators.required
        ]),
        text: new FormControl(question.text,[
          Validators.required
        ]),
        category: new FormArray([], this.minSelectedCheckboxes(1))
      })
    this.addCheckboxes(question);
  }

  private addCheckboxes(question) {
    this.categoryList.forEach((checkbox) => {
      if (question.category.indexOf(checkbox.name)>=0){
        this.categoryFormArray.push(new FormControl(true))
      }
      else {
        this.categoryFormArray.push(new FormControl(false))
      }
    })
  }


  getPost(path){
    this.firebaseService.getPost(path).valueChanges()
      .subscribe(question=>
      {
        this.setCurrentQuestion(question)
      })

  }

  submit() {

    const selectedCategoryIds: [] = this.form.value.category
      .map((checked, i) => checked ? this.categoryList[i].name : null)
      .filter(v => v !== null);

    const questionObject: Question = {
      title: this.form.value.title,
      date: this.currentQuestion.date,
      text: this.form.value.text,
      author: this.auth.userEmail,
      category: selectedCategoryIds,
      comments: this.currentQuestion.comments,
      solved: this.currentQuestion.solved,
      approved: this.currentQuestion.approved
    }


    this.firebaseService.updatePost(this.dbPath,questionObject)
      .then(()=> this.cancel())
      .catch(error=> console.log(error))
  }

  minSelectedCheckboxes(min = 1) {
    const validator: ValidatorFn = (formArray: FormArray) => {
      const totalSelected = formArray.controls
        .map(control => control.value)
        .reduce((prev, next) => next ? prev + next : prev, 0);
      return totalSelected >= min ? null : { required: true };
    };

    return validator;
  }

  cancel(){
    this.currentQuestion = null
    this.router.navigate([`/viewQuestion/${this.dbPath}`])
  }

}
