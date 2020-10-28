import {Component} from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {Router} from '@angular/router';
import {ThemeService} from '../../shared/services/theme.service';
import {CurrentUser} from '../../shared/classes/current-user';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent{

  public isAuth: boolean
  public user: CurrentUser

  constructor(private authService: AuthService, private router: Router, public themeService: ThemeService) {
    themeService.theme.subscribe()
    // authService.checkLogin().subscribe(
    //   user=> {
    //     this.user = user
    //     this.isAuth = true
    //   }
    // )
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
