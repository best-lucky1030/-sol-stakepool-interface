import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent {

  @Output() search: EventEmitter<string> = new EventEmitter<string>();
  @Input() placeholder: string;
  @Input() time: number = 0;
  constructor() {}
  onSearch(val) {
    this.search.emit(val);
  }
}
