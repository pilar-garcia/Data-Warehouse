import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userName = '';
  logged = false;

  constructor( private router: Router, private loginService: LoginService) {
  }

  ngOnInit(): void {
    this.loginService.user.subscribe(user =>{
        this.userName = user.data;
        if(user.data === ''){
          this.logged = false;
          this.userName = '';
        } else {
          this.logged = true;
        }
    });
  }


  logout(): void {
    this.loginService.logout();
    this.router.navigateByUrl('/login');
  }
}
