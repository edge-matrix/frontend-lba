import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgramsRoutingModule } from './programs-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CampusHeroComponent, CampusHeroFormComponent, JobPageComponent, VendorFormComponent, VendorPageComponent } from './index';
import { SharedComponentModule } from 'src/app/_shared/shared.module';
import { CommonComponentModule } from '../_components/common-component.module';

@NgModule({
  declarations: [
    CampusHeroComponent,
    CampusHeroFormComponent,
    VendorPageComponent,
    VendorFormComponent,
    JobPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProgramsRoutingModule,
    SharedComponentModule,
    CommonComponentModule,
  ]
})
export class ProgramsModule { }
