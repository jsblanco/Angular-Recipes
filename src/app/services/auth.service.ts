import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from '../auth/models/user.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromRoot from '../store/app.reducer'
import * as AuthActions from '../auth/store/auth.actions'

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //loggedUser = new BehaviorSubject<User>(null);
  private logoutTimer: any;

  constructor(private http: HttpClient, private router: Router, private store: Store<fromRoot.AppState>) { }

  requestUrl(endpoint: string) {
    const baseUrl = environment.authBaseUrl;
    const apiKey = environment.firebaseApiKey;
    return baseUrl + endpoint + apiKey;
  }

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(this.requestUrl('signUp'), {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.errorHandler),
        tap((response) => this.handleAuthentication(response))
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(this.requestUrl('signInWithPassword'), {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.errorHandler),
        tap((response) => this.handleAuthentication(response))
      );
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('loggedUser'));

    if (!userData) return;

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (!!loadedUser.token) {
      const expiration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.store.dispatch(AuthActions.Login({
        email: loadedUser.email,
        userId: loadedUser.id,
        token: loadedUser.token,
        expirationDate: new Date(userData._tokenExpirationDate)
      }))
      //this.loggedUser.next(loadedUser);
      this.autoLogout(expiration);
    }
  }

  logout() {
    this.store.dispatch(AuthActions.Logout());
    //this.loggedUser.next(null);
    localStorage.removeItem('loggedUser');
    this.router.navigate(['/auth ']);
    if (this.logoutTimer) clearTimeout(this.logoutTimer);
    this.logoutTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.logoutTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(response: AuthResponseData) {
    const expirationDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
    this.store.dispatch(AuthActions.Login({
      email: response.email,
      userId: response.localId,
      token: response.idToken,
      expirationDate
    }
    ))
    this.autoLogout(+response.expiresIn * 1000);
    const { email, localId, idToken, expiresIn } = response;
    const user = new User(email, localId, idToken, expirationDate);
    //this.loggedUser.next(user);
    localStorage.setItem('loggedUser', JSON.stringify(user));
  }

  private errorHandler(e: HttpErrorResponse) {
    let errorMessage =
      'Se ha producido un error indeterminado al procesar su petición.';
    if (!e.error || !e.error.error) {
      return throwError(errorMessage);
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
    return throwError(errorMessage);
  }
}
