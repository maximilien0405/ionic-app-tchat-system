import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-edit-mail',
  templateUrl: './edit-mail.component.html',
  styleUrls: ['../../sender.component.scss']
})
export class EditMailComponent implements OnInit {
  public close: boolean;

  constructor() {}

  ngOnInit(): void {}
}
