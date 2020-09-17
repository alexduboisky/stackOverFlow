import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators, FormArray, FormBuilder, ValidatorFn} from '@angular/forms';
import * as category from '../../../../assets/data/category.json'
import {AuthService} from '../../../shared/services/auth.service';
import {DatabaseService} from '../../../shared/services/database.service';
import {Question} from '../../../shared/classes/question';
import {Router} from '@angular/router';

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.scss']
})
export class NewQuestionComponent implements OnInit {

  form: FormGroup
  categoryList: any[] = []
  checkedCategory: any[] = []

  get categoryFormArray() {
    return this.form.controls.category as FormArray;
  }

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private database: DatabaseService, private router: Router) {}

  ngOnInit(): void {
    this.categoryList = category.category
    this.form = this.formBuilder.group(
      {title: new FormControl(null,[
          Validators.required
        ]),
        text: new FormControl(null,[
          Validators.required
        ]),
        category: new FormArray([], this.minSelectedCheckboxes(1))
      })
    this.addCheckboxes();
  }

  private addCheckboxes() {
    this.categoryList.forEach(() => this.categoryFormArray.push(new FormControl(false)));
  }

  submit() {

    const selectedCategoryIds: [] = this.form.value.category
      .map((checked, i) => checked ? this.categoryList[i].name : null)
      .filter(v => v !== null);


    const questionObject: Question = {
      title: this.form.value.title,
      date: new Date().getTime().toString(),
      text: this.form.value.text,
      author: this.auth.userEmail,
      category: selectedCategoryIds
    }
    this.database.createPost(questionObject)
      .then(()=>this.router.navigate(['questions']))
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
}
