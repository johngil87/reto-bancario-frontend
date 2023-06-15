import { Component, EventEmitter, Input, OnInit, Output, Type } from '@angular/core';

type typeInput = 'text'|'number'|'email';

@Component({
  selector: 'input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.css']
})
export class InputSearchComponent implements OnInit {

  constructor() { }

  @Input() inputType: typeInput = 'text'; 
  @Output() search: EventEmitter<string> = new EventEmitter();

  ngOnInit() {
  }

  filterData(){
    const input = document.getElementById('inputSearch') as HTMLInputElement;
    this.search.emit(input.value);
  }

}
