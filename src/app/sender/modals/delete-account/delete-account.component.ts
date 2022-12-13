import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['../../sender.component.scss'],
})
export class DeleteAccountComponent implements OnInit {
  @Output() closeValue = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  public deleteAccount(): void {
    
  }
}
