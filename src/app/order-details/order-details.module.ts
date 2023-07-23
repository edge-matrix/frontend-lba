import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { OrderDetailsRoutingModule } from './order-details-routing.module';
import { OrderDetailsComponent } from './order-details.component';
import { CommonComponentModule } from '../_components/common-component.module';
import { CancleOrderComponent } from './components';

@NgModule({
  declarations: [
    OrderDetailsComponent,

    CancleOrderComponent

  ],
  imports: [
    CommonModule,
    OrderDetailsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonComponentModule
  ]
})
export class OrderDetailsModule { }
