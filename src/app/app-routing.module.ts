import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent, PageNotFoundComponent } from './_shared';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'favorite', loadChildren: () => import('./favorites/favorites.module').then(m => m.FavoritesModule) },
  { path: 'checkout', loadChildren: () => import('./checkout/checkout.module').then(m => m.CheckoutModule) },
  { path: 'categories', loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule) },
  { path: 'shops', loadChildren: () => import('./shop-list/shop-list.module').then(m => m.ShopListModule) },
  { path: 'menu/:slug', loadChildren: () => import('./menu/menu.module').then(m => m.MenuModule) },
  { path: 'shop/:slug', loadChildren: () => import('./shop-details/shop-details.module').then(m => m.ShopDetailModule) },
  { path: 'order-history', loadChildren: () => import('./order-history/order-history.module').then(m => m.OrderHistoryModule) },
  { path: 'order-details/:orderId', loadChildren: () => import('./order-details/order-details.module').then(m => m.OrderDetailsModule) },
  { path: 'settings', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule) },
  { path: 'search', loadChildren: () => import('./search-result/search-result.module').then(m => m.SearchResultModule) },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
