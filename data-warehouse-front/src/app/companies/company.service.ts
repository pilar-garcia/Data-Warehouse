import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { LoginService } from '../login/login.service';
import { Company } from './company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private loginService: LoginService,
    private http: HttpClient) {
  }

  getCompanies() {
    return new Promise<Observable<Company[]>>(resolve=>{
      this.loginService.user.pipe(
        take(1) //useful if you need the data once and don't want to manually cancel the subscription again
      ).subscribe(user =>{
        const httpOptions = {
          headers: new HttpHeaders({
            Authorization: user.token
          })
        };
        resolve(this.http.get<Company[]>('http://127.0.0.1:3000/companies',httpOptions));
      });     
    });
  }

  postCompany(name: string, address: string, countryId: number){

    return new Promise<Observable<Company>>(resolve=>{
      this.loginService.user.pipe(
        take(1) //useful if you need the data once and don't want to manually cancel the subscription again
      ).subscribe(user =>{
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
            Authorization: user.token
          })
        };
        resolve(this.http.post<Company>('http://127.0.0.1:3000/companies', {name: name, countryId: countryId, address: address },httpOptions));
      });     
    });
    
  }

}
