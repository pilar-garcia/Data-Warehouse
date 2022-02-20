import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from './User';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  user: Subject<User> = new Subject;

  constructor() { }

  login(user: User): void{
    this.user.next(user);
  }

  logout(){
    this.user.next({email: '', password: ''});
  }

}
