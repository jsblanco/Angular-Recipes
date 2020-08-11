import { Action } from '@ngrx/store';
import { Recipe } from '../recipe.model';

export const SET_RECIPES = '[Recipes] SET_RECIPES';
export const ADD_RECIPE = '[Recipes] ADD_RECIPE';
export const EDIT_RECIPE = '[Recipes] EDIT_RECIPE';
export const DELETE_RECIPE = '[Recipes] DELETE_RECIPE';
export const FETCH_RECIPES = '[Recipes] FETCH_RECIPES';
export const STORE_RECIPES = '[Recipes] STORE_RECIPES';

export class SetRecipes implements Action {
    readonly type = SET_RECIPES;
    constructor(public payload: Recipe[]) { }
}

export class FetchRecipes implements Action {
    readonly type = FETCH_RECIPES;
}

export class StoreRecipes implements Action {
    readonly type = STORE_RECIPES;
}

export class AddRecipe implements Action {
    readonly type = ADD_RECIPE;
    constructor(public payload: Recipe) { }
}

export class EditRecipe implements Action {
    readonly type = EDIT_RECIPE;
    constructor(public payload: { index: number, recipe: Recipe }) { }
}

export class DeleteRecipe implements Action {
    readonly type = DELETE_RECIPE;
    constructor(public payload: number) { }
}

export type RecipesActions =
 SetRecipes 
 | FetchRecipes 
 | AddRecipe 
 | EditRecipe 
 | DeleteRecipe;