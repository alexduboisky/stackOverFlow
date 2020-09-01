import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators, FormArray, FormBuilder} from '@angular/forms';
import {formatDate} from '@angular/common';
import * as category from '../../../../assets/data/category.json'
import * as questions from '../../../../assets/data/questions.json'

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.scss']
})
export class NewQuestionComponent implements OnInit {

  form: FormGroup
  categoryList: object

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group(
      {title: new FormControl(null,[
        Validators.required
      ]),
      text: new FormControl(null,[
        Validators.required
      ]),
      checkArray: this.fb.array([],[Validators.required])
    })
  }

  ngOnInit(): void {
    this.categoryList = category.category
  }

  onCheckboxChange(e) {
    let checkArray: FormArray = this.form.get('checkArray') as FormArray;
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  submit() {
    let questionObject: object
    questionObject = {
      title: this.form.value.title,
      date: formatDate(new Date(), 'dd.MM.yyyy','en'),
      text: this.form.value.text,
      //tags: checkArray
    }

    //questions.questions.push(questionObject)
  }
}
