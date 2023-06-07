import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { MenuRoutingModule } from './menu-routing.module';
import { MenuComponent } from './menu.component';
import { CommonComponentModule } from '../_components/common-component.module';
import { FilterComponent, ItemComponent } from './components';

@NgModule({
  declarations: [
    MenuComponent,

    FilterComponent,
    ItemComponent,
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonComponentModule
  ]
})
export class MenuModule { }
