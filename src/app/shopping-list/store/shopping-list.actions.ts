import { Ingredient } from 'src/app/common/ingredient.model';

export const ADD_INGREDIENT='[Shopping List] ADD_INGREDIENT';
export const ADD_INGREDIENTS='[Shopping List] ADD_INGREDIENTS';
export const DELETE_INGREDIENT='[Shopping List] DELETE_INGREDIENT';
export const UPDATE_INGREDIENT='[Shopping List] UPDATE_INGREDIENT';
export const START_EDIT='[Shopping List] START_EDIT';
export const STOP_EDIT='[Shopping List] STOP_EDIT';

export function AddIngredient(payload) {
    return {type: ADD_INGREDIENT, payload}
}

export function AddIngredients(payload) {
    return {type: ADD_INGREDIENTS, payload}
}

export function UpdateIngredient(payload) {
    return {type: UPDATE_INGREDIENT, payload}
}

export function DeleteIngredient() {
    return {type: DELETE_INGREDIENT}
}

export function StartEdit(payload) {
    return {type: START_EDIT, payload}
}

export function StopEdit() {
    return {type: STOP_EDIT}
}