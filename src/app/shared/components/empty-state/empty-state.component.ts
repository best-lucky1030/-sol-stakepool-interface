import { Component, OnInit } from '@angular/core';
import { faPlug } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.scss']
})
export class EmptyStateComponent implements OnInit {
  connectIcon = faPlug
  constructor() { }

  ngOnInit(): void {
  }

}
