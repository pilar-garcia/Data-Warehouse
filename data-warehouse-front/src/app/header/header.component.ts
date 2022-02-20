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
    let user = localStorage.getItem('user');
    if(user != null){
      this.logged = true;
      this.userName = (JSON.parse(user)).email;
    }
  }

  ngOnInit(): void {
    this.loginService.user.subscribe(user =>{
        this.userName = user.email;
        if(user.email === ''){
          this.logged = false;
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
