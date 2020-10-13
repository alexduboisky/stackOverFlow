import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../shared/services/auth.service';
import * as category from '../../../../assets/data/category.json';
import {DatabaseService} from '../../../shared/services/database.service';
import {Router} from '@angular/router';
import {SortByDatePipe} from '../../../shared/pipes/sortByDate.pipe';
import {FilterForADayPipe} from '../../../shared/pipes/filter-for-aday.pipe';
import {FilterForAWeekPipe} from '../../../shared/pipes/filter-for-aweek.pipe';
import {FilterForAMonthPipe} from '../../../shared/pipes/filter-for-amonth.pipe';
import {SolvedQuestionsPipe} from '../../../shared/pipes/solved-questions.pipe';
import {Question} from '../../../shared/classes/question';
import {FilterByCategoryPipe} from '../../../shared/pipes/filter-by-category.pipe';
import {ThemeService} from '../../../shared/services/theme.service';

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
  public isAdmin: boolean = false

  public userName: string
  categoryList = []



  constructor(public auth: AuthService, private firebaseService: DatabaseService, private router: Router, public theme: ThemeService){
    theme.theme.subscribe()
  }

  ngOnInit(): void {
    this.getPostsList()
    this.categoryList = category.category
  }

  getPostsList() {
    this.firebaseService.getPostsList().subscribe(questions => {
      this.firebaseService.getAdmins().valueChanges().subscribe(admins=> {
        this.userName = this.auth.userEmail
        this.adminList = admins;
        this.checkIsAdmin(this.adminList, this.userName)
        questions.forEach(item => {
          if (this.isAdmin){
            this.questionsList.push(new Question(item))
          }
          else {
            if (item.approved === true) this.questionsList.push(new Question(item))
          }
        })
        this.filteredList = this.questionsList
        this.isLoading = true
      })
    });
  }

  checkIsAdmin(adminList: string[], currentUser: string){
    adminList.forEach(admin=>{
      if(admin === currentUser){
        this.isAdmin = true
      }
    })
  }

  setCurrentQuestion(question) {
    this.router.navigate(['/viewQuestion',question.key])
    this.firebaseService.currentQuestion = question
  }

  sort() {
    this.filteredList = new SortByDatePipe().transform(this.filteredList, this.isSorted)
    this.isSorted = !this.isSorted
  }

  filterForADay() {
    this.filteredList = new FilterForADayPipe().transform(this.questionsList)
  }

  filterForAWeek() {
    this.filteredList = new FilterForAWeekPipe().transform(this.questionsList)
  }

  filterForAMonth() {
    this.filteredList = new FilterForAMonthPipe().transform(this.questionsList)
  }

  filterForAllTime() {
    this.filteredList = this.questionsList
  }

  selectSolved(solved: boolean) {
    this.filteredList = new SolvedQuestionsPipe().transform(this.questionsList, solved)
  }

  filterByCategory(event, ...args) {
    if (event){
      if (event.target.checked){
        this.selectedCategory.push(event.target.value)
      }
      else {
        this.selectedCategory.splice(this.selectedCategory.indexOf(event.target.value),1)
      }
      if (this.selectedCategory.length === 0){
        this.filteredList = this.questionsList
      }
      else {
        this.filteredList = new FilterByCategoryPipe().transform(this.questionsList, this.selectedCategory)
      }
    }
    else {
      this.filteredList = new FilterByCategoryPipe().transform(this.questionsList, [`${args}`])
    }
  }

  changeMarkUpView(type: string) {
    this.isLinear = type === 'linear';
  }

  approveQuestion(key: string){
    this.firebaseService.updatePost(key, {'approve': true}).then(()=>{
      this.questionsList.map(question=>{
        if (question.key === key) question.approved = true
      })
      this.filteredList = this.questionsList
    })
  }
}
