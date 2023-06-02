import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import {RouterModule} from '@angular/router';
import { PageSpinnerComponent } from '.';

@NgModule({
  declarations: [
    /* Components */
    PageSpinnerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
  ],
  exports: [
    /* Components */
    PageSpinnerComponent
  ],
})
export class SharedComponentModule { }
