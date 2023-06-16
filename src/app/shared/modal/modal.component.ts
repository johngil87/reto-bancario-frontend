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
  @Input() isModalVisible:boolean = false;
  @Input() editable: string = '';
  @Output() closedModal: EventEmitter<boolean> = new EventEmitter();

  ngOnInit() {
  }

  closeModal() {
    this.isModalVisible = false;
    this.closedModal.emit(false)
  }

}
