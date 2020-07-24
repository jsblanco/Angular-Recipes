import { Ingredient } from '../../common/ingredient.model'
import * as ShoppingListActions from './shopping-list.actions'

export interface AppState {
    shoppingList: State;
}

export interface State {
    editedIngredient: Ingredient;
    editedIngredientIndex: Number;
    ingredients: Ingredient[]
}

const initialState: State = {
    editedIngredient: null,
    editedIngredientIndex: -1,
    ingredients: [
        new Ingredient('Ajos', 3),
        new Ingredient('Cebollas', 2),
        new Ingredient('Tomates', 4),
        new Ingredient('Pimientos', 1),
    ]
}

export function shoppingListReducer(state = initialState, { type, payload }) {

    let updatedIngredients: Ingredient[];

    switch (type) {
        case ShoppingListActions.ADD_INGREDIENT:
            const index = state.ingredients
                .map(ingredient => ingredient.name.toLowerCase())
                .indexOf(payload.name.toLowerCase())
            if (index === -1) return {
                ...state,
                ingredients: [...state.ingredients, payload]
            };
            updatedIngredients = [...state.ingredients];
            updatedIngredients[index] = {
                name: state.ingredients[index].name,
                amount: state.ingredients[index].amount + payload.amount
            };
            return {
                ...state,
                ingredients: updatedIngredients
            }
        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, ...payload]
            };
        case ShoppingListActions.UPDATE_INGREDIENT:
            updatedIngredients = [...state.ingredients];
            updatedIngredients[payload.index] = payload.updatedIngredient;
            return {
                ...state, ingredients: updatedIngredients
            };
        case ShoppingListActions.DELETE_INGREDIENT:
            updatedIngredients = [...state.ingredients];
            updatedIngredients.splice(payload, 1);
            return {
                ...state, ingredients: updatedIngredients
            };
        default:
            return state;
    }

}