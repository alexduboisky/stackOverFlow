import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {


  constructor(public authService: AuthService,
              private  router: Router) {}

  form: FormGroup

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

  // login() {
  //   this.authService.login(this.form.get('email').value, this.form.get('password').value);
  // }

  submit() {


    if (this.form.valid){
      this.authService.login(this.form.get('email').value, this.form.get('password').value)
      // if ()
    }

    this.router.navigate(['/'])
  }
}
