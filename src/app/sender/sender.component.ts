import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkService } from '../common/services/network.service';

@Component({
  selector: 'app-sender',
  templateUrl: './sender.component.html',
  styleUrls: ['./sender.component.scss'],
})
export class SenderComponent implements OnInit {
  public apiError: boolean;
  public networkError: boolean;

  constructor(private router: Router, private networkService: NetworkService) {
    // Check the network status
    //this.networkService.checkAPIAndNetworkStatus();

    // Check the API status changes
    // this.networkService.subjectApiOrNetworkError.subscribe(res => {
    //   this.apiError = res.apiError;
    //   this.networkError = res.networkError;
    // })
    this.router.navigateByUrl('sender/feed');
  }

  public ngOnInit(): void {
    // Redirect to home
  }
}
