import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipesComponent } from './recipes.component';
import { AuthGuard } from '../guards/auth.guard';
import { NoRecipeSelectedComponent } from './no-recipe-selected/no-recipe-selected.component';
import { RecipeResolverService } from '../services/recipe-resolver.service';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
import { RecipeInfoComponent } from './recipe-info/recipe-info.component';

const routes: Routes = [
    {
      path: '',
      component: RecipesComponent,
      canActivate: [AuthGuard],
      children: [
        {
          path: '',
          component: NoRecipeSelectedComponent,
          resolve: [RecipeResolverService],
        },
        { path: 'new', component: EditRecipeComponent },
        {
          path: ':id',
          component: RecipeInfoComponent,
          resolve: [RecipeResolverService],
        },
        {
          path: ':id/edit',
          component: EditRecipeComponent,
          resolve: [RecipeResolverService],
        },
      ],
    }
  ];
  
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecipesRoutingModule {}