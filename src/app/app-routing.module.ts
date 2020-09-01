import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomePageComponent} from './questionModule/components/home-page/home-page.component';
import {LoginPageComponent} from './authModule/components/login-page/login-page.component';
import {SignupPageComponent} from './authModule/components/signup-page/signup-page.component';
import {NewQuestionComponent} from './questionModule/components/new-question/new-question.component';
import {AllQuestionsComponent} from './questionModule/components/all-questions/all-questions.component';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import {redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['/']);

const routes: Routes = [
    {path: '', component:HomePageComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }, children:[
        {path:'questions', component: AllQuestionsComponent}
      ]},
    {path: 'login', component: LoginPageComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToHome }},
    {path: 'signup', component: SignupPageComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToHome }},
    {path:'newQuestion', component: NewQuestionComponent, data: { authGuardPipe: redirectUnauthorizedToLogin }}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
