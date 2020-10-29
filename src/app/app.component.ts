import {Component, OnDestroy, OnInit} from '@angular/core';
import {ThemeService} from './shared/services/theme.service';
import {CurrentUser} from './shared/classes/current-user';
import {AuthService} from './shared/services/auth.service';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{

  title = 'stackOverFlow';

  public isAuth: boolean
  public user: CurrentUser

  constructor(private authService: AuthService, private router: Router, public themeService: ThemeService) {
    themeService.theme.subscribe()
    authService.checkLogin().subscribe(
      user=> {
        if (user){
          this.user = user
          this.isAuth = true
        }
      }
    )
  }

  logout() {
    this.authService.logout()
      .then(() => {
        this.router.navigate(['login'])
        this.isAuth = false
      });
  }

  addQuestion() {
    this.router.navigate(['newQuestion'])
  }

}
