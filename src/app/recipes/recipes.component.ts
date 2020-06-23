import { Component } from '@angular/core';
import { RecipesService } from '../services/recipes.service';
import { Recipe } from "./recipe.model"

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipesService],
})
export class RecipesComponent {
  selectedRecipe: Recipe
}
