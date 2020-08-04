import { User } from '../models/user.model';
import * as AuthActions from './auth.actions'

export interface State {
    user: User;
    authError: string;
    loading: boolean;
}

const initialState: State = {
    user: null,
    authError: null,
    loading: false,
}

export function AuthReducer(state = initialState, { type, payload }) {

    switch (type) {
        case AuthActions.LOGIN:
            const user = new User(payload.email, payload.userId, payload.token, payload.expirationDate);
            return { ...state, loading: false, user };
        case AuthActions.LOGOUT:
            return { ...state, user: null, authError: null };
        case AuthActions.LOGIN_START:
            return { ...state, authError: null, loading: true }
        case AuthActions.LOGIN_FAIL:
            return { ...state, authError: payload, loading: false };
        case AuthActions.SIGNIN:
            return state;
        default:
            return state;
    }
}