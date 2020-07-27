import { Ingredient } from '../../common/ingredient.model'
import * as ShoppingListActions from './shopping-list.actions'

export interface State {
    editedIngredient: Ingredient;
    editedIngredientIndex: number;
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
            updatedIngredients = [...state.ingredients];
            addIngredient(updatedIngredients, payload)
            return {
                ...state,
                ingredients: updatedIngredients
            }
        case ShoppingListActions.ADD_INGREDIENTS:
            updatedIngredients = [...state.ingredients];
            payload.map((ingredient: Ingredient) => addIngredient(updatedIngredients, ingredient))
            return {
                ...state,
                ingredients: updatedIngredients
            };
        case ShoppingListActions.UPDATE_INGREDIENT:
            updatedIngredients = [...state.ingredients];
            updatedIngredients[state.editedIngredientIndex] = payload
            return {
                ...state, ingredients: updatedIngredients
            };
        case ShoppingListActions.DELETE_INGREDIENT:
            updatedIngredients = [...state.ingredients];
            updatedIngredients.splice(state.editedIngredientIndex, 1);
            return {
                ...state, ingredients: updatedIngredients
            };
        case ShoppingListActions.START_EDIT:
            return {
                ...state,
                editedIngredient: { ...state.ingredients[payload] },
                editedIngredientIndex: payload,
            };
        case ShoppingListActions.STOP_EDIT:
            return {
                ...state,
                editedIngredient: null,
                editedIngredientIndex: -1,
            };
        default:
            return state;
    }
}

function addIngredient(ingredientsArray: Ingredient[], ingredient: Ingredient) {
    const index = ingredientsArray
        .map(ingredient => ingredient.name.trim().toLowerCase())
        .indexOf(ingredient.name.trim().toLowerCase());
    index === -1
        ? ingredientsArray.push(ingredient)
        : ingredientsArray[index] = {
            name: ingredientsArray[index].name,
            amount: ingredientsArray[index].amount + ingredient.amount
        };
}