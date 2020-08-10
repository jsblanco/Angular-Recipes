import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { RecipesService } from '../../services/recipes.service';
import { Recipe } from '../recipe.model';
import * as fromRoot from '../../store/app.reducer'

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  recipesSub: Subscription

  constructor(
    private recipesService: RecipesService,
    private store: Store<fromRoot.AppState>) { }

    ngOnInit() {
      // this.recipes = this.recipesService.getRecipes();
      // this.recipesSub= this.recipesService.recipesChanged
      this.recipesSub = this.store.select('recipes')
      .pipe(map(recipesState => recipesState.recipes))
      .subscribe((recipes: Recipe[]) => {
        this.recipes = recipes;
      }
      )
  }

  ngOnDestroy() {
    this.recipesSub.unsubscribe()
  }

}
