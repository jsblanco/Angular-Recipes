import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {
    path: 'auth', loadChildren: () => import('./auth/auth.module').then(
      m => m.AuthModule)

  },//'./auth/auth.module#AuthModule' },
  {
    path: 'recipes', loadChildren:
      () => import("./recipes/recipes.module").then(
        m => m.RecipesModule)
  },

  // './recipes/recipes.module#RecipesModule'},
  {
    path: 'shopping-list', loadChildren: () => import('./shopping-list/shopping-list.module').then(
      m => m.ShoppingListModule)
  },//'./shopping-list/shopping-list.module#ShoppingListModule' },
  { path: '**', redirectTo: 'recipes' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }