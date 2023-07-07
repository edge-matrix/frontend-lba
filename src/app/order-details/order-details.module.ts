import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { OrderDetailsRoutingModule } from './order-details-routing.module';
import { OrderDetailsComponent } from './order-details.component';
import { CommonComponentModule } from '../_components/common-component.module';

@NgModule({
  declarations: [
    OrderDetailsComponent

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
