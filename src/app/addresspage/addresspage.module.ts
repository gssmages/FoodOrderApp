import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddresspagePageRoutingModule } from './addresspage-routing.module';

import { AddresspagePage } from './addresspage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddresspagePageRoutingModule
  ],
  declarations: [AddresspagePage]
})
export class AddresspagePageModule {}
