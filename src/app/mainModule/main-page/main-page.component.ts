import { Component } from '@angular/core';
import {User} from 'firebase';
import {AuthService} from '../../shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {

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
