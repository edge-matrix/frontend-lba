import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopDetailComponent } from './shop-details.component';

const routes: Routes = [
  { path: '', component: ShopDetailComponent  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopDetailRoutingModule { }
