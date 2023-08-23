import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent, PageNotFoundComponent } from './_shared';
import { AuthGuard } from './_guards';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'favorite', loadChildren: () => import('./favorites/favorites.module').then(m => m.FavoritesModule) },
  { path: 'checkout', loadChildren: () => import('./checkout/checkout.module').then(m => m.CheckoutModule), canActivate: [AuthGuard], },
  { path: 'categories', loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule) },
  { path: 'shops', loadChildren: () => import('./shop-list/shop-list.module').then(m => m.ShopListModule) },
  { path: 'menu/:slug', loadChildren: () => import('./menu/menu.module').then(m => m.MenuModule) },
  { path: 'shop/:slug', loadChildren: () => import('./shop-details/shop-details.module').then(m => m.ShopDetailModule) },
  { path: 'order-history', loadChildren: () => import('./order-history/order-history.module').then(m => m.OrderHistoryModule), canActivate: [AuthGuard], },
  { path: 'order-page/:orderId', loadChildren: () => import('./order-details/order-details.module').then(m => m.OrderDetailsModule), canActivate: [AuthGuard], },
  { path: 'scanner', loadChildren: () => import('./scanner/scanner.module').then(m => m.ScannerModule) },
  { path: 'settings', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule) },
  { path: 'search', loadChildren: () => import('./search-result/search-result.module').then(m => m.SearchResultModule) },

  { path: 'notification', loadChildren: () => import('./notification/notification.module').then(m => m.NotificationModule), canActivate: [AuthGuard], },
  { path: 'policies', loadChildren: () => import('./policies/policies.module').then(m => m.PoliciesModule) },
  { path: 'programs', loadChildren: () => import('./programs/programs.module').then(m => m.ProgramsModule) },
  { path: 'playzone', loadChildren: () => import('./playzone/playzone.module').then(m => m.PlayzoneModule) },

  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
