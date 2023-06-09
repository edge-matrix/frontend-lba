import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout.component';
import { CommonComponentModule } from '../_components/common-component.module';
import { OnlinePaymentsComponent } from './components';

@NgModule({
  declarations: [
    CheckoutComponent,

    OnlinePaymentsComponent

  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonComponentModule
  ]
})
export class CheckoutModule { }
