import { Component } from '@angular/core';
import {User} from 'firebase';
import {AuthService} from '../../shared/services/auth.service';
import {Router} from '@angular/router';
import {ThemeService} from '../../shared/services/theme.service';
import {DatabaseService} from '../../shared/services/database.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {

  public isAuth: boolean
  public user: User

  constructor(private auth: AuthService, private router: Router, public themeService: ThemeService, private databaseService: DatabaseService) {
    auth.user.subscribe((user)=>{
      this.user = user
      this.isAuth = user != null;
    })
    themeService.theme.subscribe()
  }


  logout() {
    this.auth.logout()
      .then(() => {
        this.router.navigate(['login'])
        this.databaseService.isAdmin = false
      });
  }

  addQuestion() {
    this.router.navigate(['newQuestion'])
  }

}
