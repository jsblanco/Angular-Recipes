import { Ingredient } from 'src/app/common/ingredient.model';

export const ADD_INGREDIENT='ADD_INGREDIENT';
export const ADD_INGREDIENTS='ADD_INGREDIENTS';
export const DELETE_INGREDIENT='DELETE_INGREDIENT';
export const UPDATE_INGREDIENT='UPDATE_INGREDIENT';
export const START_EDIT='START_EDIT';
export const STOP_EDIT='STOP_EDIT';

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