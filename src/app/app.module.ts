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

import {AuthService} from './shared/services/auth.service';
import { AllQuestionsComponent } from './questionModule/components/all-questions/all-questions.component';
import { NewQuestionComponent } from './questionModule/components/new-question/new-question.component';
import { MainPageComponent } from './mainModule/main-page/main-page.component';
import {DatabaseService} from './shared/services/database.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    SignupPageComponent,
    AllQuestionsComponent,
    NewQuestionComponent,
    MainPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireAuthGuardModule
  ],
  providers: [AuthService, DatabaseService],
  bootstrap: [AppComponent],
  exports:[AppRoutingModule]
})
export class AppModule { }
