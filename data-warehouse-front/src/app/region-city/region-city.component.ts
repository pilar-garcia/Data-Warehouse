import { Component, OnInit } from '@angular/core';
import { Region } from './region';

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
  regions: Region[] = [
    {
      id: 1,
      name: 'Sudamerica',
      opened: false,
      countries: [
        {
          id: 1,
          name: 'Colombia',
          opened: false,
          cities: [
            {
              id: 1,
              name: 'Armenia',
              opened: false
            },
            {
              id: 1,
              name: 'Bogota',
              opened: false
            }
          ]
        }
      ]
    },
    {
      id: 1,
      name: 'Norteamerica',
      opened: false,
      countries: [
        {
          id: 1,
          name: 'Canada',
          opened: false,
          cities: [
            {
              id: 1,
              name: 'Montreal',
              opened: false
            },
            {
              id: 1,
              name: 'Toronto',
              opened: false
            }
          ]
        },
        {
          id: 1,
          name: 'Mexico',
          opened: false,
          cities: [
            {
              id: 1,
              name: 'Monterrey',
              opened: false
            },
            {
              id: 1,
              name: 'Cancun',
              opened: false
            }
          ]
        }
      ]
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

  onCloseHandled(display: string) {
    this.id='';
    this.title= '';
    this.displayAgregar = "none";
  }

  save(type: string){
    switch(type){
      case 'region':
        this.regions.push({id: this.regions.length+1, name: this.inputName, countries:[], opened: false});
        break;
      case 'pais':
          this.regions[this.regionSelected].countries.push({id: this.regions[this.regionSelected].countries.length+1, name: this.inputName, cities:[], opened: false});
          break;
      case 'ciudad':
        this.regions[this.regionSelected].countries[this.countrySelected].cities.push({id: this.regions.length+1, name: this.inputName, opened: false});
      break;
    
    }
    
    this.id='';
    this.title= '';
    this.displayAgregar = "none";
    this.countrySelected = 0;
    this.regionSelected = 0;
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
