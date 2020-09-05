import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginPageComponent} from './authModule/components/login-page/login-page.component';
import {SignupPageComponent} from './authModule/components/signup-page/signup-page.component';
import {NewQuestionComponent} from './questionModule/components/new-question/new-question.component';
import {AllQuestionsComponent} from './questionModule/components/all-questions/all-questions.component';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import {redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import {MainPageComponent} from './mainModule/main-page/main-page.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['/']);

const routes: Routes = [
    {path: '', component:MainPageComponent,canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }, children: [
        {path: '', redirectTo:'questions', pathMatch:'full'},
        {path:'questions', component: AllQuestionsComponent},
        {path:'newQuestion', component: NewQuestionComponent}
      ]},
    {path: 'login', component: LoginPageComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToHome }},
    {path: 'signup', component: SignupPageComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToHome }},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
