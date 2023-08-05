import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { PoliciesComponent } from './pages';

const routes: Routes = [
  { path: '', component: SettingsComponent  },
  { path: 'policy', component: PoliciesComponent  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
