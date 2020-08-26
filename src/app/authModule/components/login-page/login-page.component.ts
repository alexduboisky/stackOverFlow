import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {


  constructor(public authService: AuthService, private router: Router) {}

  form: FormGroup;
  public error: string;

  ngOnInit(): void {

    this.form = new FormGroup({
      email: new FormControl(null,[
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null,[
        Validators.required,
        Validators.minLength(8)
        ])
    })
  }

  submit(event) {
    event.preventDefault();
    this.authService.login(this.form.get('email').value, this.form.get('password').value)
      .then(() => {
        this.router.navigate(['/'])
      })
      .catch(err => {
        this.error = err.message
      });
  }

  loginWithGoogle(event) {
    event.preventDefault();
    this.authService.loginWithGoogle()
      .then(()=>{
        this.router.navigate(['/'])
      })
      .catch(err=>{
        this.error = err.message
      })
  }

  loginWithGitHub(event) {
    event.preventDefault();
    this.authService.loginWithGitHub()
      .then(()=>{
        this.router.navigate(['/'])
      })
      .catch(err=>{
        this.error = err.message
      })
  }

  loginWithMicrosoft(event) {
    event.preventDefault();
    this.authService.loginWithMicrosoft()
      .then(()=>{
        this.router.navigate(['/'])
      })
      .catch(err=>{
        this.error = err.message
      })
  }
}
