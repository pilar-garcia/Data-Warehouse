import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { LoginService } from '../login/login.service';
import { Contact } from './contact';

@Injectable({
  providedIn: 'root'
})
export class ContactApiService {

  constructor(private loginService: LoginService,
    private http: HttpClient) { }

    postContact(contactModel: any){
      return new Promise<Observable<Contact>>(resolve=>{
        this.loginService.user.pipe(
          take(1) //useful if you need the data once and don't want to manually cancel the subscription again
        ).subscribe(user =>{
          const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              Authorization: user.token
            })
          };
          resolve(this.http.post<Contact>('http://127.0.0.1:3000/contacts', contactModel,httpOptions));
        });     
      });
      
    }

    patchContact(contactModel: any){
      return new Promise<Observable<Contact>>(resolve=>{
        this.loginService.user.pipe(
          take(1) //useful if you need the data once and don't want to manually cancel the subscription again
        ).subscribe(user =>{
          const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              Authorization: user.token
            })
          };
          resolve(this.http.patch<Contact>('http://127.0.0.1:3000/contacts/'+contactModel.id, contactModel,httpOptions));
        });     
      });
      
    }
    
    getContacts() {
      return new Promise<Observable<Contact[]>>(resolve=>{
        this.loginService.user.pipe(
          take(1) //useful if you need the data once and don't want to manually cancel the subscription again
        ).subscribe(user =>{
          const httpOptions = {
            headers: new HttpHeaders({
              Authorization: user.token
            })
          };
          resolve(this.http.get<Contact[]>('http://127.0.0.1:3000/contacts',httpOptions));
        });     
      });
    }

}
