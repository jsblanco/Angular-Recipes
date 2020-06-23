import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../../services/recipes.service';

@Component({
  selector: 'app-recipe-info',
  templateUrl: './recipe-info.component.html',
  styleUrls: ['./recipe-info.component.css'],
})
export class RecipeInfoComponent implements OnInit {
  recipe: Recipe = this.recipesService.recipes[0];

  constructor(private recipesService: RecipesService) {}

  ngOnInit() {
    this.recipesService.selectedRecipe.subscribe((recipe: Recipe) => {
      this.recipe = recipe;
    });
  }
}
