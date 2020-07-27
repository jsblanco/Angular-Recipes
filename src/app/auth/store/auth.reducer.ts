import { User } from '../models/user.model';
import * as AuthActions from './auth.actions'

export interface State {
    user: User
}

const initialState: State = {
    user: null
}

export function AuthReducer(state = initialState, { type, payload }) {

    switch (type) {
        case AuthActions.LOGIN:
            const user = new User(payload.email, payload.userId, payload.token, payload.expirationDate);
            return { ...state, user };
        case AuthActions.LOGOUT:
            return { ...state, user: null };
        case AuthActions.SIGNIN:
            return state;
        default:
            return state;
    }
}