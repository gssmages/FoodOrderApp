import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailpagePageRoutingModule } from './detailpage-routing.module';

import { DetailpagePage } from './detailpage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailpagePageRoutingModule
  ],
  declarations: [DetailpagePage]
})
export class DetailpagePageModule {}
