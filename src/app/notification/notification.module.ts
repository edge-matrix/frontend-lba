import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { NotificationRoutingModule } from './notification-routing.module';
import { NotificationComponent } from './notification.component';
import { CommonComponentModule } from '../_components/common-component.module';

@NgModule({
  declarations: [
    NotificationComponent,
  ],
  imports: [
    CommonModule,
    NotificationRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonComponentModule
  ]
})
export class NotificationModule { }
