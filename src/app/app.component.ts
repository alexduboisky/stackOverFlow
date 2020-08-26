import { Component } from '@angular/core';
import {AuthService} from './services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'stackOverFlow';

  constructor(private auth: AuthService, private router: Router) {
  }


  logout() {
    this.auth.logout()
      .then(() => {
        //this.auth.user.subscribe()
        this.router.navigate(['login'])
    });
  }
}
