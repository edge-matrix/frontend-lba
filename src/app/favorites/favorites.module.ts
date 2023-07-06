import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { FavoritesRoutingModule } from './favorites-routing.module';
import { FavoritesComponent } from './favorites.component';
import { CommonComponentModule } from '../_components/common-component.module';

@NgModule({
  declarations: [
    FavoritesComponent

  ],
  imports: [
    CommonModule,
    FavoritesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonComponentModule
  ]
})
export class FavoritesModule { }
