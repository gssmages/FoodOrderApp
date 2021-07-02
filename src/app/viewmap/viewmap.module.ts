import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewmapPageRoutingModule } from './viewmap-routing.module';

import { ViewmapPage } from './viewmap.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewmapPageRoutingModule
  ],
  declarations: [ViewmapPage]
})
export class ViewmapPageModule {}
