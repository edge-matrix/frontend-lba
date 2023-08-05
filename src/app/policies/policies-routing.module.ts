import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CancellationRefundComponent } from './cancellation-refund/cancellation-refund.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermConditionPageComponent } from './terms-condition/terms-condition.component';

const routes: Routes = [
  { path: 'privacy-policy', component: PrivacyPolicyComponent  },
  { path: 'terms-condition', component: TermConditionPageComponent  },
  { path: 'cancellation-refund', component: CancellationRefundComponent  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PoliciesRoutingModule { }
