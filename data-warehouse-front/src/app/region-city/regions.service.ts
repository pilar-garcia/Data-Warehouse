import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { HandleError, HttpErrorHandler } from '../http-error-handler.service';
import { LoginService } from '../login/login.service';
import { City } from './city';
import { Country } from './country';
import { Region } from './region';

@Injectable({
  providedIn: 'root'
})
export class RegionsService {


  constructor(private loginService: LoginService,
    private http: HttpClient) {
    }

  getRegions() {
    return new Promise<Observable<Region[]>>(resolve=>{
      this.loginService.user.pipe(
        take(1) //useful if you need the data once and don't want to manually cancel the subscription again
      ).subscribe(user =>{
        console.log("llamo a regions", user);
        const httpOptions = {
          headers: new HttpHeaders({
            Authorization: user.token
          })
        };
        resolve(this.http.get<Region[]>('http://127.0.0.1:3000/regions',httpOptions));
      });     
    });
  }

  postRegion(name: string){

    return new Promise<Observable<Region>>(resolve=>{
      this.loginService.user.pipe(
        take(1) //useful if you need the data once and don't want to manually cancel the subscription again
      ).subscribe(user =>{
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
            Authorization: user.token
          })
        };
        resolve(this.http.post<Region>('http://127.0.0.1:3000/regions', {name: name },httpOptions));
      });     
    });
    
  }

  postCountry(name: string, regionId: number){

    return new Promise<Observable<Country>>(resolve=>{
      this.loginService.user.pipe(
        take(1) //useful if you need the data once and don't want to manually cancel the subscription again
      ).subscribe(user =>{
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
            Authorization: user.token
          })
        };
        resolve(this.http.post<Country>('http://127.0.0.1:3000/countries', {name: name, regionId: regionId },httpOptions));
      });     
    });
    
  }

  postCity(name: string, countryId: number){

    return new Promise<Observable<City>>(resolve=>{
      this.loginService.user.pipe(
        take(1) //useful if you need the data once and don't want to manually cancel the subscription again
      ).subscribe(user =>{
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
            Authorization: user.token
          })
        };
        resolve(this.http.post<City>('http://127.0.0.1:3000/cities', {name: name, countryId: countryId },httpOptions));
      });     
    });
    
  }

  getCountriesByRegion(regionId: number){
    return new Promise<Observable<Country[]>>(resolve=>{
      this.loginService.user.pipe(
        take(1) //useful if you need the data once and don't want to manually cancel the subscription again
      ).subscribe(user =>{
        const httpOptions = {
          headers: new HttpHeaders({
            Authorization: user.token
          })
        };
        resolve(this.http.get<Country[]>('http://127.0.0.1:3000/regions/'+regionId+'/countries',httpOptions));
      });     
    });
  }

  
  getCountries(){
    return new Promise<Observable<Country[]>>(resolve=>{
      this.loginService.user.pipe(
        take(1) //useful if you need the data once and don't want to manually cancel the subscription again
      ).subscribe(user =>{
        const httpOptions = {
          headers: new HttpHeaders({
            Authorization: user.token
          })
        };
        resolve(this.http.get<Country[]>('http://127.0.0.1:3000/countries',httpOptions));
      });     
    });
  }

  getCitiesByCountry(countryId: number){
    return new Promise<Observable<City[]>>(resolve=>{
      this.loginService.user.pipe(
        take(1) //useful if you need the data once and don't want to manually cancel the subscription again
      ).subscribe(user =>{
        const httpOptions = {
          headers: new HttpHeaders({
            Authorization: user.token
          })
        };
        resolve(this.http.get<City[]>('http://127.0.0.1:3000/countries/'+countryId+'/cities',httpOptions));
      });     
    });
  }
}
