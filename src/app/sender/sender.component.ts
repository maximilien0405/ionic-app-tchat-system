import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sender',
  templateUrl: './sender.component.html',
  styleUrls: ['./sender.component.scss'],
})
export class SenderComponent implements OnInit {
  constructor(private router: Router) {}

  public ngOnInit(): void {
    this.router.navigateByUrl('sender/menu')
  }
}
