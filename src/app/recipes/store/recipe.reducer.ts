import { Recipe } from '../recipe.model';
import * as RecipeActions from './recipe.actions';

export interface State {
    recipes: Recipe[];
}

const initialState: State = {
    recipes: []
}

export function recipeReducer(state, {type, payload}: RecipeActions.RecipesActions){
    switch (type){

    case RecipeActions.SET_RECIPES:
        return {
            ...state,
            recipes: [...payload]
        }
    default:
        return state;
    }
}