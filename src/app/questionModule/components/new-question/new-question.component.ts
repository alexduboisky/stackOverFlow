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
  checkedCategory: any[] = []


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
        arrayForCategory: this.formBuilder.array(
          this.checkedCategory.map(()=>{this.formBuilder.control('')
          })
        )
      })

  }

  // onCheckboxChange(e) {
  //   let checkArray: FormArray = this.form.get('checkArray') as FormArray
  //   if (e.target.checked) {
  //     checkArray.push(new FormControl(e.target.value));
  //   } else {
  //     let i: number = 0;
  //     checkArray.controls.forEach((item: FormControl) => {
  //       if (item.value == e.target.value) {
  //         checkArray.removeAt(i);
  //         return;
  //       }
  //       i++;
  //     });
  //   }
  // }


  submit() {
    let questionObject: Question
    questionObject = {
      title: this.form.value.title,
      date: new Date().getTime().toString(),
      text: this.form.value.text,
      author: this.auth.userEmail,
      category: this.checkedCategory
    }
    this.database.createPost(questionObject)
      .then(()=>this.router.navigate(['questions']))
      .catch(error=> console.log(error))

  }
}
