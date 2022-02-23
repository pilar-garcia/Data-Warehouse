import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { LoginService } from '../login/login.service';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private loginService: LoginService,
    private http: HttpClient) { }

    postUser(userModel: any){
      return new Promise<Observable<User>>(resolve=>{
        this.loginService.user.pipe(
          take(1) //useful if you need the data once and don't want to manually cancel the subscription again
        ).subscribe(user =>{
          const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              Authorization: user.token
            })
          };
          resolve(this.http.post<User>('http://127.0.0.1:3000/users', userModel,httpOptions));
        });     
      });
      
    }
    
    getUsers() {
      return new Promise<Observable<User[]>>(resolve=>{
        this.loginService.user.pipe(
          take(1) //useful if you need the data once and don't want to manually cancel the subscription again
        ).subscribe(user =>{
          const httpOptions = {
            headers: new HttpHeaders({
              Authorization: user.token
            })
          };
          resolve(this.http.get<User[]>('http://127.0.0.1:3000/users',httpOptions));
        });     
      });
    }
}
