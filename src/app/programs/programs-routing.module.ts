import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampusHeroComponent, CampusHeroFormComponent, VendorFormComponent, VendorPageComponent } from './index';

const routes: Routes = [
  { path: 'campus-hero', component: CampusHeroComponent  },
  { path: 'campus-hero-form', component: CampusHeroFormComponent  },

  { path: 'vendor-page', component: VendorPageComponent  },
  { path: 'vendor-page-form', component: VendorFormComponent  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramsRoutingModule { }
