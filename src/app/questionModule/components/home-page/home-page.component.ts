import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../shared/services/auth.service';
import * as category from '../../../../assets/data/category.json';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit{

  userName: string
  categoryList: object

  constructor(auth: AuthService){
      auth.user.subscribe((user)=>{
        if (user){
          this.userName = user.email
        }
      },error => {
        console.log('some errors',error)
      })
  }

  ngOnInit() {
    this.categoryList = category.category
  }


}
