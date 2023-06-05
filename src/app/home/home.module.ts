import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { CommonComponentModule } from '../_components/common-component.module';
import { BannerComponent, CategoriesComponent, FavShopComponent, OrderTypeComponent, RecommendedComponent, SearchComponent } from './components';

@NgModule({
  declarations: [
    HomeComponent,
    OrderTypeComponent,
    SearchComponent,
    BannerComponent,
    CategoriesComponent,
    FavShopComponent,
    RecommendedComponent,

  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonComponentModule
  ]
})
export class HomeModule { }
