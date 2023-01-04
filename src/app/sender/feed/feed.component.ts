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

  constructor(private networkService: NetworkService) {
    // Check the API status changes
    this.networkService.subjectApiError.subscribe(res =>{
      this.APIError = res;
    })

    // Check the Network status changes
    this.networkService.subjectNetworkError.subscribe(res =>{
      this.networkError = res;
    })
  }

  ngOnInit(): void {}
}