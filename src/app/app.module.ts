import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeIngredientComponent } from './recipes/recipe-list/recipe-ingredient/recipe-ingredient.component';
import { RecipeInfoComponent } from './recipes/recipe-info/recipe-info.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListEditComponent } from './shopping-list/shopping-list-edit/shopping-list-edit.component';
import { NavbarComponent } from './header/navbar/navbar.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { DropdownDirective } from './common/dropdown.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShoppingListComponent,
    RecipeListComponent,
    RecipeIngredientComponent,
    RecipeInfoComponent,
    RecipesComponent,
    ShoppingListEditComponent,
    NavbarComponent,
    RecipeItemComponent,
    DropdownDirective,
  ],
  imports: [
    BrowserModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
