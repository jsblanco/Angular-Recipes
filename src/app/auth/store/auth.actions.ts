export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SIGNIN = 'SIGNIN';
export const AAAA = 'AAAA';


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

export function Logout(){
    return {type: LOGOUT, }
}

