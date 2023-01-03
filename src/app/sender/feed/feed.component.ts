import { Component, OnInit } from '@angular/core';
import { slideUpAnimation } from 'src/app/common/animations';
import { NetworkService } from 'src/app/common/services/network.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['../sender.component.scss'],
  animations: [slideUpAnimation]
})
export class FeedComponent implements OnInit {
  public networkError = false;
  public APIError = false;

  constructor(private networkService: NetworkService) {}

  ngOnInit(): void {
    // Check the network status
    this.networkService.checkNetwork().then((res) => {
      this.networkError = res.network;
      this.APIError = res.api;
    });
  }
}