import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeliverymanpagePageRoutingModule } from './deliverymanpage-routing.module';

import { DeliverymanpagePage } from './deliverymanpage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeliverymanpagePageRoutingModule
  ],
  declarations: [DeliverymanpagePage]
})
export class DeliverymanpagePageModule {}
