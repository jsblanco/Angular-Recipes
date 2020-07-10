import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

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
import { ShoppingListService } from './services/shopping-list.service';
import { AppRoutingModule } from './app-routing.module';
import { EditRecipeComponent } from './recipes/edit-recipe/edit-recipe.component';
import { RecipesService } from './services/recipes.service';
import { RecipeResolverService } from './services/recipe-resolver.service';
import { AuthComponent } from './auth/auth.component';
import { SpinnerComponent } from './common/spinner/spinner.component';

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
    EditRecipeComponent,
    AuthComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule, 
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ShoppingListService, RecipesService, RecipeResolverService],
  bootstrap: [AppComponent],
})
export class AppModule {}
