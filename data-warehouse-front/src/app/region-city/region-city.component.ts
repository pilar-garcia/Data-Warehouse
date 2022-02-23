import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from './city';
import { Country } from './country';
import { Region } from './region';
import { RegionsService } from './regions.service';

@Component({
  selector: 'app-region-city',
  templateUrl: './region-city.component.html',
  styleUrls: ['./region-city.component.css']
})
export class RegionCityComponent implements OnInit {

  isClicked = false;
  displayAgregar = 'none';
  title='';
  id='';
  inputName='';
  regionSelected=0;
  countrySelected=0;
  regions: Region[] = [];

  constructor(private regionService: RegionsService) { }

  ngOnInit(): void {
    this.getRegions();
  }

  getRegions(): void {
    this.regionService.getRegions().then((value: Observable<Region[]>) =>{
      value.subscribe((regions: Region[]) =>{
          regions.forEach(region => {
            region.countries = []
          });
          this.regions = regions;
      });
    });
  }

  openRegion(i: number){
    this.regions[i].opened = !this.regions[i].opened;
    if(this.regions[i].opened){
      this.regionService.getCountriesByRegion(this.regions[i].id).then((value: Observable<Country[]>) =>{
        value.subscribe((countries: Country[]) =>{
          countries.forEach(country => {
            country.cities = []
          });
          this.regions[i].countries = countries;
        });
      });
    }
  }

  openCountry(i: number, y: number){
    this.regions[i].countries[y].opened = !this.regions[i].countries[y].opened;
    if(this.regions[i].countries[y].opened){
      this.regionService.getCitiesByCountry(this.regions[i].countries[y].id).then((value: Observable<City[]>) =>{
        value.subscribe((cities: City[]) =>{
          this.regions[i].countries[y].cities = cities;
        });
      });
    }
  }

  onCloseHandled(display: string) {
    this.id='';
    this.title= '';
    this.displayAgregar = "none";
  }

  save(type: string){
    switch(type){
      case 'region':
        this.regionService.postRegion(this.inputName).then((value: Observable<Region>) =>{
          value.subscribe((region: Region) =>{
            region.countries = [];
            this.regions.push(region);
          });
        });
        break;
      case 'pais':
          this.regionService.postCountry(this.inputName, this.regions[this.regionSelected].id).then((value: Observable<Country>) =>{
            value.subscribe((country: Country) =>{
              this.regions[this.regionSelected].countries.push(country);
              this.regionSelected = 0;
            });
          });
          break;
      case 'ciudad':
        this.regionService.postCity(this.inputName, this.regions[this.regionSelected].countries[this.countrySelected].id).then((value: Observable<City>) =>{
          value.subscribe((city: City) =>{
            this.regions[this.regionSelected].countries[this.countrySelected].cities.push(city);
            this.regionSelected = 0;
            this.countrySelected = 0;
          });
        });
      break;
    
    }
    
    this.id='';
    this.title= '';
    this.displayAgregar = "none";
    this.inputName = '';
  }

  showAgregar(regionSelected: number, countrySelected: number,type: string){
    this.regionSelected = regionSelected;
    this.countrySelected = countrySelected;
    switch(type){
      case 'region':
        this.id='region';
        this.title= 'Agregar región';
        break;
      case 'pais':
        this.id='pais';
        this.title= 'Agregar país';
        break;
      case 'ciudad':
      this.id='ciudad';
      this.title= 'Agregar ciudad';
      break;
    
    }
      this.displayAgregar = 'flex';
  }

}
