import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-edit-pwd',
  templateUrl: './edit-pwd.component.html',
  styleUrls: ['../../sender.component.scss']
})
export class EditPwdComponent implements OnInit {
  public close: boolean;
  @Output() closeValue = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}
}
