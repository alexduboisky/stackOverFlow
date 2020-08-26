import {Component} from '@angular/core';
import {AuthService} from '../../../shared/services/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent{

  userName: string

  constructor(auth: AuthService){
      auth.user.subscribe((user)=>{
        if (user){
          this.userName = user.email
        }
      },error => {
        console.log('some errors',error)
      })
  }


}
