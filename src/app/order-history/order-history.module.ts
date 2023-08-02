import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { OrderHistoryRoutingModule } from './order-history-routing.module';
import { OrderHistoryComponent } from './order-history.component';
import { CommonComponentModule } from '../_components/common-component.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    OrderHistoryComponent

  ],
  imports: [
    CommonModule,
    OrderHistoryRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonComponentModule,
    InfiniteScrollModule
  ]
})
export class OrderHistoryModule { }
