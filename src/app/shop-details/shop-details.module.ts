import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { ShopDetailRoutingModule } from './shop-details-routing.module';
import { ShopDetailComponent } from './shop-details.component';
import { CommonComponentModule } from '../_components/common-component.module';
import { ShopDetailsComponent, ShopOverviewComponent, ShopPhotosComponent, ShopReviewsComponent } from './components';

@NgModule({
  declarations: [
    ShopDetailComponent,

    ShopDetailsComponent,
    ShopOverviewComponent,
    ShopPhotosComponent,
    ShopReviewsComponent,
  ],
  imports: [
    CommonModule,
    ShopDetailRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonComponentModule
  ]
})
export class ShopDetailModule { }
