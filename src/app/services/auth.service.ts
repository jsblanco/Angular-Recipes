import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

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
  constructor(private http: HttpClient) {}

  requestUrl(endpoint: string) {
    const baseUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:';
    const apiKey = '?key=AIzaSyAuAWb1CWscbV9ad94_4pp3Y1OM7-EAD6c';

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
        catchError((e) => {
          let errorMessage =
            'Se ha producido un error al intentar registrar las presentes credenciales.';
          if (!e.error || !e.error.error) {
            return throwError(errorMessage);
          }
          switch (e.error.error.message) {
            case 'EMAIL_EXISTS':
              errorMessage = 'Este correo ya está registrado en la plataforma.';
              break;
            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
              errorMessage =
                'Demasiados intentos fallidos en poco tiempo; espere un poco antes de continuar.';
              break;
          }
          return throwError(errorMessage);
        })
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
        catchError((e) => {
          let errorMessage =
            'Se ha producido un error al intentar acceder con las presentes credenciales.';
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
          }
          return throwError(errorMessage);
        })
      );
  }
}
