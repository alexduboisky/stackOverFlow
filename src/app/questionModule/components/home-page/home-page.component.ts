import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit,  OnDestroy {

  userName: string
  private subscription: Subscription

  constructor(private auth: AuthService){}

  ngOnInit(): void {
    this.subscription =this.auth.user.subscribe((user)=>{
      this.userName = user.email
    },error => {
      console.log('some errors',error)
    })
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

}
