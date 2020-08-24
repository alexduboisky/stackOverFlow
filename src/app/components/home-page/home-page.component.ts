import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  userName: string

  constructor(auth: AuthService) {

    auth.user.subscribe((user)=>{
      this.userName = user.email
    })
  }

  ngOnInit(): void {
  }

}
