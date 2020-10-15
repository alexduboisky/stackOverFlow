import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../shared/services/auth.service';
import * as category from '../../../../assets/data/category.json';
import * as themes from '../../../../assets/data/themes.json'
import {DatabaseService} from '../../../shared/services/database.service';
import {Router} from '@angular/router';
import {SortByDatePipe} from '../../../shared/pipes/sortByDate.pipe';
import {SelectQuestionsPipe} from '../../../shared/pipes/select-questions.pipe';
import {Question} from '../../../shared/classes/question';
import {ThemeService} from '../../../shared/services/theme.service';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';

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
  public adminList: string[] = []
  //public isAdmin: boolean = false
  public timeForFilter: number = null

  public userName: string
  public categoryList: object[] = []
  public themesList: object[] = []
  public formForCategories: FormGroup
  public formForQuestion: FormGroup
  public formForTime: FormGroup


  constructor(public authService: AuthService, public firebaseService: DatabaseService, private router: Router, public themeService: ThemeService, private formBuilder: FormBuilder) {
    themeService.theme.subscribe()
  }

  ngOnInit(): void {
    this.formForCategories = this.formBuilder.group({
      category: new FormArray([])
    })
    this.formForQuestion = this.formBuilder.group({
      questions: [new FormControl(''),
                  new FormControl(''),
                  new FormControl(''),
                  new FormControl('')]
    })
    this.formForTime = this.formBuilder.group({
      time: [new FormControl(false),
        new FormControl(false),
        new FormControl(false),
        new FormControl(true)]
    })
    this.getPostsList()
    this.categoryList = category.category
    this.themesList = themes.themes
    this.categoryList.forEach(category => this.categoryFormArray.push(new FormControl(false)))
  }


  getPostsList() {
    this.firebaseService.getPostsList().subscribe(questions => {
        questions.forEach(item => {
          if (this.firebaseService.isAdmin) {
            this.questionsList.push(new Question(item))
          } else {
            if (item.approved === true || (item.approved === false && item.author === this.userName)) this.questionsList.push(new Question(item))
          }
        })
        this.filteredList = this.questionsList
        this.isLoading = true
    });
  }

  // checkIsAdmin(adminList: string[], currentUser: string) {
  //   adminList.forEach(admin => {
  //     if (admin === currentUser) {
  //       this.isAdmin = true
  //     }
  //   })
  // }

  setCurrentQuestion(question) {
    this.router.navigate(['/viewQuestion', question.key])
    this.firebaseService.currentQuestion = question
  }

  sort() {
    this.filteredList = new SortByDatePipe().transform(this.filteredList, this.isSorted)
    this.isSorted = !this.isSorted
  }


  filterForATime(time: number) {
    this.timeForFilter = time
  }


  filterForAllQuestions() {
    this.selectedCategory = []
    this.categoryFormArray.controls.map(control => control.setValue(false))
  }

  selectQuestions(type: string, userName?: string) {
    this.filteredList = new SelectQuestionsPipe().transform(this.questionsList, type, userName)
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
  }
}

