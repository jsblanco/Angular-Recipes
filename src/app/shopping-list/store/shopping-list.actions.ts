import { Ingredient } from 'src/app/common/ingredient.model';

export const ADD_INGREDIENT='ADD_INGREDIENT';
export const ADD_INGREDIENTS='ADD_INGREDIENTS';
export const DELETE_INGREDIENT='DELETE_INGREDIENT';
export const UPDATE_INGREDIENT='UPDATE_INGREDIENT';

export function AddIngredient(payload) {
    return {type: ADD_INGREDIENT, payload: payload}
}

export function AddIngredients(payload) {
    return {type: ADD_INGREDIENTS, payload: payload}
}

export function UpdateIngredient(payload) {
    return {type: UPDATE_INGREDIENT, payload: payload}
}

export function DeleteIngredient(payload) {
    return {type: DELETE_INGREDIENT, payload: payload}
}
