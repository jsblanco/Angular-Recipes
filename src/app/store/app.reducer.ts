import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer'
import * as fromRecipes from '../recipes/store/recipe.reducer'
import * as fromAuth from '../auth/store/auth.reducer'
import { ActionReducerMap } from '@ngrx/store'

export interface AppState {
    auth: fromAuth.State;
    recipes: fromRecipes.State;
    shoppingList: fromShoppingList.State;
}


export const appReducer: ActionReducerMap<AppState> = {
    auth: fromAuth.AuthReducer,
    recipes: fromRecipes.recipeReducer,
    shoppingList: fromShoppingList.shoppingListReducer,
}