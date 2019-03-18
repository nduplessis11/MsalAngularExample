import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MsalModule, MsalInterceptor } from '@azure/msal-angular';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LogLevel } from 'msal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DemoComponent } from './demo/demo.component';

export function loggerCallback(logLevel, message, piiEnabled) {
  console.log('client logging' + message);
}
export const protectedResourceMap: [string, string[]][] = [
  ['https://graph.microsoft.com/v1.0/me', ['user.read']]
  // ... other scopes
];

@NgModule({
  declarations: [AppComponent, DemoComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MsalModule.forRoot({
      clientID: 'd3cc5f72-4871-4763-b7ef-90045ffdb001',
      authority: 'https://login.microsoftonline.com/tfp/7eb74f6b-f186-412b-a988-4f91aae7d9d9/B2C_1_signupsignin1',
      validateAuthority: true,
      redirectUri: window.location.origin,
      cacheLocation: 'localStorage',
      postLogoutRedirectUri: window.location.origin,
      navigateToLoginRequestUrl: false,
      popUp: false,
      unprotectedResources: ['https://www.microsoft.com/en-us/'],
      protectedResourceMap,
      logger: loggerCallback,
      correlationId: '1000',
      level: LogLevel.Info,
      piiLoggingEnabled: true
    })
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: MsalInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {}
