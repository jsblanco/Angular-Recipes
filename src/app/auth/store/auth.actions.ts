export const LOGIN_START = '[Auth] LOGIN_START';
export const LOGIN = '[Auth] LOGIN';
export const LOGIN_FAIL = '[Auth] LOGIN_FAIL';
export const LOGOUT = '[Auth] LOGOUT';
export const SIGNIN = '[Auth] SIGNIN';
export const AAAA = '[Auth] AAAA';


interface User {
    email: string,
    userId: string,
    token: string,
    expirationDate: Date
}

export function SignIn(payload){
    return {type: SIGNIN, payload}
}

export function Login(payload: User){
    return {type: LOGIN, payload}
}

export function LoginStart(payload: {email: String, password: String}){
    return {type: LOGIN_START, payload}
}

export function LoginFail(payload: String){
    return {type: LOGIN_FAIL, payload}
}


export function Logout(){
    return {type: LOGOUT, }
}

