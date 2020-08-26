import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './authModule/components/login-page/login-page.component';
import { SignupPageComponent } from './authModule/components/signup-page/signup-page.component';
import { HomePageComponent } from './questionModule/components/home-page/home-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {AngularFireAuthGuardModule} from '@angular/fire/auth-guard'

import {AuthService} from './services/auth.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    SignupPageComponent,
    HomePageComponent
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
  providers: [AuthService],
  bootstrap: [AppComponent],
  exports:[AppRoutingModule]
})
export class AppModule { }
