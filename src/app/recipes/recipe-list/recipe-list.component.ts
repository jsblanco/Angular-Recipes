import { Component,OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../../services/recipes.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  recipesSub: Subscription

  constructor(private recipesService: RecipesService) {}

  ngOnInit() {
    this.recipes = this.recipesService.getRecipes();
    this.recipesSub= this.recipesService.recipesChanged.subscribe(
      (recipes: Recipe[])=>{
       this.recipes = recipes; 
      }
    )
  }

  ngOnDestroy(){
    this.recipesSub.unsubscribe()
  }

}
