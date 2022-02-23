import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { User } from './User';
import { Login } from './login';
import { HandleError, HttpErrorHandler } from '../http-error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  user: BehaviorSubject<Login> = new BehaviorSubject({data: '', token: ''});
  private handleError: HandleError;

  constructor(private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
      this.handleError = httpErrorHandler.createHandleError('LoginService');
  }

  logout(){
    this.user.next({data: '', token: ''});
  }

  login(user: User){
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post<Login>('http://127.0.0.1:3000/users/login', {userName: user.email, pass: user.password},httpOptions)
      .subscribe(login  => {
        this.user.next(login);
      });
  }

  

}
