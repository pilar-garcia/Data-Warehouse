import { tap } from 'rxjs/operators';

import {DecimalPipe} from '@angular/common';
import {Component, QueryList, ViewChildren, OnInit} from '@angular/core';
import { Observable, of } from 'rxjs';

import {Contact} from './contact';
import {CountryService} from './contact.service';
import {NgbdSortableHeader, SortEvent} from './sortable.directive';
import { ImagePickerConf } from 'ngp-image-picker';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  providers: [CountryService, DecimalPipe],
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  
  countries$: Observable<Contact[]>;
  total$: Observable<number>;
  sortedElement: string;
  sortedDirection: string;
  checkAllContactsModel: boolean;
  displayNewContact = "none";
  displayMoreActions = "none";

  imagePickerConf: ImagePickerConf = {
    borderRadius: '50%',
    language: 'en',
    width: '180px',
    height: '180px',
  };

  openModal() {
    this.displayNewContact = "flex";
  }

  onCloseHandled(display: string) {
    if(display === 'newContact'){
      this.displayNewContact = "none";
    }
    if(display === 'moreActions'){
      this.displayMoreActions = "none";
    }
  }

  showMoreActions(){
    this.displayMoreActions = 'flex';
  }


  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>|undefined;

  constructor(public service: CountryService) {
    this.countries$ = service.countries$;
    this.total$ = service.total$;
    this.sortedElement = '';
    this.sortedDirection = '';
    this.checkAllContactsModel = false;
  }

  ngOnInit(): void {
  }

  onSort({column, direction}: SortEvent) {
    // resetting other headers
    if(this.headers){
      this.headers.forEach(header => {
        if (header.sortable !== column) {
          header.direction = '';
        }
      });
    }
      
    this.service.sortColumn = column;
    this.service.sortDirection = direction;
    this.sortedDirection = direction;
    this.sortedElement = column;
    if(direction == ''){
      this.sortedElement = '';
    }
  }

  checkAllContacts(): void {
    
    this.countries$.pipe(
      tap(countries => {
        countries.forEach(contact => {
            contact.checked = this.checkAllContactsModel;
          });
      })
    ).subscribe();
    
  }

  onImageChange(value: any): void{
    console.log(value);
  }

}
