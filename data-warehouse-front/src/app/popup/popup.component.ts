import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  @Input() display = 'none';
  @Input() title = '';
  @Input() icon = 'bi bi-cloud-plus-fill';
  @Input() showConfirm = true;

  @Output() popupClose = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onCloseHandled(): void {
    this.display = 'none';
    this.popupClose.emit();
  }

}
