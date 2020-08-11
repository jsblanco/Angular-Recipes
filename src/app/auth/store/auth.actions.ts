export const LOGIN_START = '[Auth] LOGIN_START';
export const AUTH_SUCCESS = '[Auth] AUTH';
export const AUTH_FAIL = '[Auth] AUTH_FAIL';
export const LOGOUT = '[Auth] LOGOUT';
export const SIGNUP_START = '[Auth] SIGNUP_START';
export const CLEAR_ERROR = '[Auth] CLEAR_ERROR';
export const AUTO_LOGIN = '[Auth] AUTO_LOGIN';


interface User {
    email: string,
    userId: string,
    token: string,
    expirationDate: Date,
    redirect: boolean
}

export function SignUp(payload: { email: String, password: String }) {
    return { type: SIGNUP_START, payload }
}

export function AuthenticateSuccess(payload: User) {
    return { type: AUTH_SUCCESS, payload }
}

export function LoginStart(payload: { email: String, password: String }) {
    return { type: LOGIN_START, payload }
}

export function AuthenticateFail(payload: String) {
    return { type: AUTH_FAIL, payload }
}

export function Logout() {
    return { type: LOGOUT, }
}

export function ClearError() {
    return { type: CLEAR_ERROR }
}

export function AutoLogin() {
    return { type: AUTO_LOGIN }
}
