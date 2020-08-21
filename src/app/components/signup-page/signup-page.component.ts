import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {

  constructor(public authService: AuthService) {}

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

  signup() {
    this.authService.signup(this.form.get('email').value, this.form.get('password').value);
  }

  submit() {
    if (this.form.valid){
      this.signup()
      this.form.reset()
    }
  }

}
