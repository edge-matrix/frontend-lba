import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent, PageNotFoundComponent } from './_shared';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'shops', loadChildren: () => import('./shop-list/shop-list.module').then(m => m.ShopListModule) },
  { path: 'menu', loadChildren: () => import('./menu/menu.module').then(m => m.MenuModule) },

  { path: 'favorite', loadChildren: () => import('./favorites/favorites.module').then(m => m.FavoritesModule) },
  { path: 'order-history', loadChildren: () => import('./order-history/order-history.module').then(m => m.OrderHistoryModule) },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
