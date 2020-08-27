import { Component } from '@angular/core';
import {AuthService} from './shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'stackOverFlow';
  public isAuth: boolean

  constructor(private auth: AuthService, private router: Router) {
    auth.user.subscribe((user)=>{
      console.log(user)
      if (user!=null){
        return this.isAuth = true
      }
      else {
        return this.isAuth = false
      }
    })
  }


  logout() {
    this.auth.logout()
      .then(() => {
        this.router.navigate(['login'])
    });
  }
}
