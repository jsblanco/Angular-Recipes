import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthResponseData } from 'src/app/services/auth.service';
import * as AuthActions from './auth.actions';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

interface NgRxAction { type: string; payload?: any }

@Injectable()
export class AuthEffects {
    @Effect()
    authLogin = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData: NgRxAction) => this.http
            .post<AuthResponseData>(this.requestUrl('signInWithPassword'), {
                email: authData.payload.email,
                password: authData.payload.password,
                returnSecureToken: true,
            })
            .pipe(
                map((response) => {
                    const expirationDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
                    return AuthActions.Login({
                        email: response.email,
                        userId: response.localId,
                        token: response.idToken,
                        expirationDate
                    })
                }
                ),
                catchError(e => {
                    let errorMessage =
                    'Se ha producido un error indeterminado al procesar su petición.';
                    if (!e.error || !e.error.error) {
                        return of(AuthActions.LoginFail(errorMessage));
                      }
                  switch (e.error.error.message) {
                    case 'EMAIL_NOT_FOUND':
                      errorMessage = 'Este correo no está registrado en la plataforma.';
                      break;
                    case 'INVALID_PASSWORD':
                      errorMessage = 'La contraseña facilitada no es válida.';
                      break;
                    case 'USER_DISABLED':
                      errorMessage =
                        'El usuario indicado ha sido inhabilitado por el administrador.';
                      break;
                    case 'EMAIL_EXISTS':
                      errorMessage = 'Este correo ya está registrado en la plataforma.';
                      break;
                    case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                      errorMessage =
                        'Demasiados intentos fallidos en poco tiempo; espere un poco antes de continuar.';
                      break;
                  }
                    return of(AuthActions.LoginFail(errorMessage))
                })
            )
        )
    );

    @Effect({dispatch: false})
    authSuccess = this.actions$.pipe(
        ofType(AuthActions.LOGIN), 
        tap(() => this.router.navigate(['/recipes']))
        )


    requestUrl(endpoint: string) {
        const baseUrl = environment.authBaseUrl;
        const apiKey = environment.firebaseApiKey;
        return baseUrl + endpoint + apiKey;
    }



    constructor(private actions$: Actions, private http: HttpClient, private router: Router, private store: Store) { }


}