import {Component, OnInit} from '@angular/core';
import {User} from 'firebase';
import {AuthService} from '../../shared/services/auth.service';
import {Router} from '@angular/router';
import {ThemeService} from '../../shared/services/theme.service';
import {DatabaseService} from '../../shared/services/database.service';
import {CurrentUser} from '../../shared/classes/current-user';
import {map, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent{

  public isAuth: boolean
  public user: CurrentUser

  constructor(private authService: AuthService, private router: Router, public themeService: ThemeService, private databaseService: DatabaseService) {
    themeService.theme.subscribe()
    authService.user$.pipe(
      map(user=> {
          this.user = user
          this.isAuth = true
      })
    ).subscribe()
  }



  logout() {
    this.authService.logout()
      .then(() => {
        this.router.navigate(['login'])
        this.authService.currentUser = undefined
        this.isAuth = false
      });
  }

  addQuestion() {
    this.router.navigate(['newQuestion'])
  }

}
