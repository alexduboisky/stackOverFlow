import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators, FormArray, FormBuilder} from '@angular/forms';
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
  categoryList: object
  checkArray: FormArray = this.form.get('checkArray') as FormArray


  constructor(private fb: FormBuilder, private auth: AuthService, private database: DatabaseService, private router: Router) {
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

    if (e.target.checked) {
      this.checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      this.checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          this.checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }


  submit() {
    let questionObject: Question
    questionObject = {
      title: this.form.value.title,
      date: new Date().getTime().toString(),
      text: this.form.value.text,
      author: this.auth.userEmail,
      //category: this.checkArray
    }
    this.database.createPost(questionObject)
    this.router.navigate(['questions'])
  }
}
