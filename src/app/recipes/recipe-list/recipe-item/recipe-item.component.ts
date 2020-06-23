import { Component, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';
import {RecipesService} from "../../../services/recipes.service"
@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent {
  @Input() recipe: Recipe;

  constructor(private recipesService: RecipesService) {}

  onSelection(){
      this.recipesService.selectedRecipe.emit(this.recipe)
  }
}
