import { LoginComponent } from './auth/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  AuthGuardService as AuthGuard
} from './auth/auth-guard.service';
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component:LoginComponent  },

  {
    path: 'products',
    canActivate: [AuthGuard],
    loadChildren: () => import('./components/products/products.module')
    .then(m => m.ProductsModule  )
 },
 {
  path: 'categories',
  canActivate: [AuthGuard],
  loadChildren: () => import('./components/categories/categories.module')
  .then(m => m.CategoriesModule  )
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
