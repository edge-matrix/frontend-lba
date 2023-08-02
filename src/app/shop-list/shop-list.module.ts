import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { ShopListRoutingModule } from './shop-list-routing.module';
import { ShopListComponent } from './shop-list.component';
import { CommonComponentModule } from '../_components/common-component.module';
import { FilterComponent, SearchComponent, ShopComponent } from './components';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    ShopListComponent,

    SearchComponent,
    FilterComponent,
    ShopComponent,
  ],
  imports: [
    CommonModule,
    ShopListRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonComponentModule,
    InfiniteScrollModule
  ]
})
export class ShopListModule { }
