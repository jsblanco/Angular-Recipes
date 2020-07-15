import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipesRoutingModule } from './recipes-routing.module';

import { RecipesComponent } from './recipes.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeInfoComponent } from './recipe-info/recipe-info.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';


@NgModule({
    declarations: [
        RecipesComponent,
        RecipeListComponent,
        RecipeItemComponent,
        RecipeInfoComponent,
        EditRecipeComponent, 
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RecipesRoutingModule,
        RouterModule
    ]
})
export class RecipesModule { }