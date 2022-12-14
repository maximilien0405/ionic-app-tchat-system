import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['../../sender.component.scss']
})
export class AboutComponent implements OnInit {
  public close: boolean;
  @Output() closeValue = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}
}