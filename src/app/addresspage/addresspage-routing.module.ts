import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddresspagePage } from './addresspage.page';

const routes: Routes = [
  {
    path: '',
    component: AddresspagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddresspagePageRoutingModule {}
