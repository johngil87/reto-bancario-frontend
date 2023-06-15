import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor() { }

  @Input() titulo!: string;
  @Input() mensaje!: string;
  @Input() displayStyle: string = 'none';
  @Input() editable: string = '';
  @Output() closedModal: EventEmitter<string> = new EventEmitter();

  ngOnInit() {
  }

  closePopup() {
    this.displayStyle = "none";
    this.closedModal.emit('none')
  }

}
