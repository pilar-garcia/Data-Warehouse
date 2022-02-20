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

  showAgregar(index: string){
    switch(index){
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
