import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeliverymanpagePage } from './deliverymanpage.page';

const routes: Routes = [
  {
    path: '',
    component: DeliverymanpagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeliverymanpagePageRoutingModule {}
