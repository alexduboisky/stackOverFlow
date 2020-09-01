import { Component } from '@angular/core';
import {AuthService} from './shared/services/auth.service';
import {Router} from '@angular/router';
import {User} from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'stackOverFlow';
  public isAuth: boolean
  public user: User

  constructor(private auth: AuthService, private router: Router) {
    auth.user.subscribe((user)=>{
      this.user = user
      this.isAuth = user != null;
    })
  }


  logout() {
    this.auth.logout()
      .then(() => {
        this.router.navigate(['login'])
    });
  }

  addQuestion() {
    this.router.navigate(['newQuestion'])
  }
}
