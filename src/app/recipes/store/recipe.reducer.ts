import { Recipe } from '../recipe.model';
import * as RecipeActions from './recipe.actions';
import { RecipeEffects } from './recipe.effects';

export interface State {
    recipes: Recipe[];
}

const initialState: State = {
    recipes: []
}

export function recipeReducer(state, action: RecipeActions.RecipesActions) {
    switch (action.type) {
        case RecipeActions.SET_RECIPES:
            return {
                ...state,
                recipes: [...action.payload]
            }
        case RecipeActions.ADD_RECIPE:
            return {
                ...state,
                recipes: [...state.recipes, action.payload]
            }
        case RecipeActions.EDIT_RECIPE:
            const updatedRecipes = [...state.recipes]
            updatedRecipes[action.payload.index] = action.payload.recipe;
            return {
                ...state,
                recipes: updatedRecipes
            }
        case RecipeActions.DELETE_RECIPE:
            return {
                ...state,
                recipes: state.recipes.filter((recipe, index)=> index !== action.payload)
            }
        default:
            return state;
    }
}