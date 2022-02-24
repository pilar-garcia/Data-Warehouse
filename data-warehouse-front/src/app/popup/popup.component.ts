import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit, OnChanges {

  @Input() display = 'none';
  @Input() title = '';
  @Input() icon = 'bi bi-cloud-plus-fill';
  @Input() showConfirm = true;

  @Output() popupClose = new EventEmitter<string>();
  @Output() popupSaved = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    const log: string[] = [];
    for (const propName in changes) {
      const changedProp = changes[propName];
      const to = JSON.stringify(changedProp.currentValue);
    }
  }

  onCloseHandled(): void {
    this.display = 'none';
    this.popupClose.emit();
  }

  onSaved(): void {
    this.display = 'none';
    this.popupSaved.emit();
  }

}
