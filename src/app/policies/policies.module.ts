import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoliciesRoutingModule } from './policies-routing.module';
import { FormsModule } from '@angular/forms';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermConditionPageComponent } from './terms-condition/terms-condition.component';
import { CancellationRefundComponent } from './cancellation-refund/cancellation-refund.component';
import { CommonComponentModule } from '../_components/common-component.module';

@NgModule({
  declarations: [
    PrivacyPolicyComponent,
    TermConditionPageComponent,
    CancellationRefundComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PoliciesRoutingModule,
    CommonComponentModule,
  ]
})
export class PoliciesModule { }
