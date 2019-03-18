import { Component, OnInit, OnDestroy } from '@angular/core';
import { BroadcastService, MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ng-btc-poc';
  isIframe = false;
  subscription: any;
  loggedIn = false;
  user: any;

  constructor(private broadcastService: BroadcastService, private msalService: MsalService) {
    this.isIframe = window !== window.parent && !window.opener;
  }

  ngOnInit(): void {
    this.subscription = this.broadcastService.subscribe('msal:loginSuccess', payload => {
      console.log('login success' + JSON.stringify(payload));
      this.loggedIn = true;
      this.user = this.msalService.getUser();
    });
  }
  ngOnDestroy() {
    // disconnect from broadcast service on component destroy
    this.broadcastService.getMSALSubject().next(1);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
