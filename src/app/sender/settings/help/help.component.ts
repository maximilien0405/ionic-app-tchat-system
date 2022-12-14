import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['../../sender.component.scss'],
})
export class HelpComponent implements OnInit {
  public close: boolean;
  public select1: boolean;
  public select2: boolean;
  public select3: boolean;
  public select4: boolean;
  @Output() closeValue = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  // Open the select dropdown
  public openSelect(id: number): void {
    switch (id) {
      case 1:
        this.select1 = !this.select1;
        break;
      case 2:
        this.select2 = !this.select2;
        break;
      case 3:
        this.select3 = !this.select3;
        break;
      case 4:
        this.select4 = !this.select4;
        break;
    }
  }
}
