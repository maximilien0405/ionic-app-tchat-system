import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkService } from '../common/services/network.service';
import { fadeAnimation } from '../common/animations';

@Component({
  selector: 'app-sender',
  templateUrl: './sender.component.html',
  styleUrls: ['./sender.component.scss'],
  animations: [fadeAnimation]
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
  }

  public ngOnInit(): void {
    // Redirect to home
    this.router.navigateByUrl('sender/menu');
  }
}
