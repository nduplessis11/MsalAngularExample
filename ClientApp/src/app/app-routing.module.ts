import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemoComponent } from './demo/demo.component';
import { MsalGuard } from '@azure/msal-angular';

const routes: Routes = [{ path: '', component: DemoComponent, canActivate: [MsalGuard] }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
