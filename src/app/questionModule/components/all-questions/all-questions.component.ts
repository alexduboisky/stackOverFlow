import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../shared/services/auth.service';
import * as category from '../../../../assets/data/category.json';
import * as themes from '../../../../assets/data/themes.json'
import {DatabaseService} from '../../../shared/services/database.service';
import {Router} from '@angular/router';
import {Question} from '../../../shared/classes/question';
import {ThemeService} from '../../../shared/services/theme.service';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {JsonList} from '../../../shared/classes/json-list';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-all-questions',
  templateUrl: './all-questions.component.html',
  styleUrls: ['./all-questions.component.scss']
})
export class AllQuestionsComponent implements OnInit {

  public questionsList = []
  public filteredList = []
  public isLoading: boolean = false
  public isSorted: boolean = false
  public selectedCategory = []
  public isLinear: boolean = false
  public adminList: JsonList[] = []
  public timeForFilter: number = null

  public userName: string
  public categoryList: object[] = []
  public themesList: JsonList[] = []
  public formForCategories: FormGroup
  public formForQuestion: FormGroup
  public formForTime: FormGroup
  public selectedQuestions: string = 'all'
  public isAdmin: boolean;


  constructor(public authService: AuthService, public PostService: DatabaseService, private router: Router, public themeService: ThemeService, private formBuilder: FormBuilder) {
    themeService.theme.subscribe()
  }

  ngOnInit(): void {
    this.formForCategories = this.formBuilder.group({
      category: new FormArray([])
    })
    this.formForQuestion = this.formBuilder.group({
      questions: new FormControl('all')
    })
    this.formForTime = this.formBuilder.group({
      time: new FormControl('forTheAllTime')
    })
    this.getPostsList()
    this.categoryList = category.category
    this.themesList = themes.themes
    this.categoryList.forEach(category => this.categoryFormArray.push(new FormControl(false)))
  }


  getPostsList() {

    this.authService.user$.pipe(
      switchMap(()=> this.PostService.getPostsList())
    )
      .subscribe(questions => {
        this.questionsList = []
        this.userName = this.authService.currentUser.email
        this.isAdmin = this.authService.currentUser.isAdmin
          questions.forEach(item => {
            if (this.isAdmin) {
              this.questionsList.push(new Question(item))
            } else {
              if (item.approved === false && item.author === this.userName){
                this.questionsList.push(new Question(item))
              }
              if (item.approved === true) {
                this.questionsList.push(new Question(item))
              }
            }
          })
          this.filteredList = this.questionsList
          this.isLoading = true
    });
  }


  setCurrentQuestion(question) {
    this.router.navigate(['/viewQuestion', question.key])
    this.PostService.currentQuestion = question
  }

  sort() {
    this.isSorted = !this.isSorted
  }


  filterForATime(time: number) {
    this.timeForFilter = time
  }


  filterForAllQuestions() {
    this.selectedCategory = []
    this.categoryFormArray.controls.map(control => control.setValue(false))
  }

  selectQuestions(type: string) {
    this.selectedQuestions = type
  }

  get categoryFormArray() {
    return this.formForCategories.controls.category as FormArray;
  }

  filterByCategory(event, ...args) {
    if (event) {
      if (event.target.checked) {
        this.selectedCategory.push(event.target.name)
      } else {
        this.selectedCategory.splice(this.selectedCategory.indexOf(event.target.value), 1)
      }
    } else {
      this.selectedCategory = [...args]
    }
    this.selectedCategory = this.selectedCategory.concat([])
  }

  changeMarkUpView(type: string) {
    this.isLinear = type === 'linear';
  }


  changeTheme(theme: string) {
    this.themeService.theme.next(theme)
  }

  clearAllFilters() {
    this.selectQuestions('all');
    this.filterForAllQuestions();
    this.filterForATime(null)
    this.formForTime.controls.time.setValue('forTheAllTime')
    this.formForQuestion.controls.questions.setValue('all')
  }
}

