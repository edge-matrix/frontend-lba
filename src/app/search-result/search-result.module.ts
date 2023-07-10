import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { SearchResultRoutingModule } from './search-result-routing.module';
import { SearchResultComponent } from './search-result.component';
import { CommonComponentModule } from '../_components/common-component.module';

@NgModule({
  declarations: [
    SearchResultComponent

  ],
  imports: [
    CommonModule,
    SearchResultRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonComponentModule
  ]
})
export class SearchResultModule { }
