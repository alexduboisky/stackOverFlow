import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './authModule/components/login-page/login-page.component';
import { SignupPageComponent } from './authModule/components/signup-page/signup-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {AngularFireAuthGuardModule} from '@angular/fire/auth-guard'
import { AngularFireDatabaseModule } from '@angular/fire/database';

import {AuthService} from './shared/services/auth.service';
import { AllQuestionsComponent } from './questionModule/components/all-questions/all-questions.component';
import { NewQuestionComponent } from './questionModule/components/new-question/new-question.component';
import { MainPageComponent } from './mainModule/main-page/main-page.component';
import {DatabaseService} from './shared/services/database.service';
import { ViewQuestionComponent } from './questionModule/components/view-question/view-question.component';
import { EditQuestionComponent } from './questionModule/components/edit-question/edit-question.component';
import { SortByDatePipe } from './shared/pipes/sortByDate.pipe';
import { FilterForADayPipe } from './shared/pipes/filter-for-aday.pipe';
import { FilterForAWeekPipe } from './shared/pipes/filter-for-aweek.pipe';
import { FilterForAMonthPipe } from './shared/pipes/filter-for-amonth.pipe';
import { SelectQuestionsPipe } from './shared/pipes/select-questions.pipe';
import { FilterByCategoryPipe } from './shared/pipes/filter-by-category.pipe';
import { FilterForATimePipe } from './shared/pipes/filter-for-atime.pipe';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    SignupPageComponent,
    AllQuestionsComponent,
    NewQuestionComponent,
    MainPageComponent,
    ViewQuestionComponent,
    EditQuestionComponent,
    SortByDatePipe,
    FilterForADayPipe,
    FilterForAWeekPipe,
    FilterForAMonthPipe,
    SelectQuestionsPipe,
    FilterByCategoryPipe,
    FilterForATimePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireAuthGuardModule,
    AngularFireDatabaseModule
  ],
  providers: [AuthService, DatabaseService],
  bootstrap: [AppComponent],
  exports:[AppRoutingModule]
})
export class AppModule { }
