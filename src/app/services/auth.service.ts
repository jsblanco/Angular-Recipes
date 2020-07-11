import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { User } from '../auth/models/user.model';
import { Router } from '@angular/router';

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
  loggedUser = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient, private router: Router) {}

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

  logout(){
    this.loggedUser.next(null);
    this.router.navigate(["/auth"]);
  }

  private handleAuthentication(response: AuthResponseData) {
    const { email, localId, idToken, expiresIn } = response;
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(email, localId, idToken, expirationDate);
    this.loggedUser.next(user);
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
