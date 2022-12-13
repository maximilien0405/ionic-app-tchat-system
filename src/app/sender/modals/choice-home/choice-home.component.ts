import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-choice-home',
  templateUrl: './choice-home.component.html',
  styleUrls: ['../../sender.component.scss'],
})
export class ChoiceHomeComponent implements OnInit {
  @Output() closeValue = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

}
