import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth.service'
import { User } from '../../auth/models/user.model';
import * as AuthActions from './auth.actions';

interface NgRxAction { type: string; payload?: any }
export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

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
        tap(response => this.authService.setLogoutTimer(+response.expiresIn*1000)),
        map(this.handleAuthentication),
        catchError(this.errorHandler)
      )
    )
  );

  @Effect({ dispatch: false })
  authSuccess = this.actions$.pipe(
    ofType(AuthActions.AUTH_SUCCESS),
    tap(() => this.router.navigate(['/recipes']))
  )

  @Effect()
  authSignup = this.actions$.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap((signupAction: NgRxAction) => this.http
      .post<AuthResponseData>(this.requestUrl('signUp'), {
        email: signupAction.payload.email,
        password: signupAction.payload.password,
        returnSecureToken: true,
      })
      .pipe(
        tap(response => this.authService.setLogoutTimer(+response.expiresIn*1000)),
        map(this.handleAuthentication),
        catchError(this.errorHandler)
      )
    )
  )

  @Effect({ dispatch: false })
  logout = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      this.authService.clearLogoutTimer();
      localStorage.removeItem('loggedUser');
      this.router.navigate(['/auth'])
    })
  )

  @Effect()
  autologin = this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(() => {
      const userData: {
        email: string;
        id: string;
        _token: string;
        _tokenExpirationDate: string;
      } = JSON.parse(localStorage.getItem('loggedUser'));
      if (!userData) return { type: 'none' };

      const loadedUser = new User(
        userData.email,
        userData.id,
        userData._token,
        new Date(userData._tokenExpirationDate)
      );

      if (!!loadedUser.token) {
        const expiration =
           new Date(userData._tokenExpirationDate).getTime() -new Date().getTime();
        this.authService.setLogoutTimer(+expiration*1000);
        return AuthActions.AuthenticateSuccess({
          email: loadedUser.email,
          userId: loadedUser.id,
          token: loadedUser.token,
          expirationDate: new Date(userData._tokenExpirationDate)
        })
      }
      return { type: 'none' }
    })
  )

  private requestUrl(endpoint: string) {
    const baseUrl = environment.authBaseUrl;
    const apiKey = environment.firebaseApiKey;
    return baseUrl + endpoint + apiKey;
  }

  private handleAuthentication(response: AuthResponseData) {
    const email = response.email;
    const userId = response.localId;
    const token = response.idToken;
    const expirationDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    localStorage.setItem('loggedUser', JSON.stringify(user));
    return AuthActions.AuthenticateSuccess({ email, userId, token, expirationDate })
  }

  private errorHandler(e: HttpErrorResponse) {
    let errorMessage =
      'Se ha producido un error indeterminado al procesar su petición.';
    if (!e.error || !e.error.error) {
      return of(AuthActions.AuthenticateFail(errorMessage));
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
    return of(AuthActions.AuthenticateFail(errorMessage));
  }



  constructor(
    private actions$: Actions, 
    private http: HttpClient, 
    private router: Router, 
    private authService: AuthService
    ) { }


}