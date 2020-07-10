import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apiKey = '?key=AIzaSyAuAWb1CWscbV9ad94_4pp3Y1OM7-EAD6c';
  constructor(private http: HttpClient) {}
  
  signup(email: string, password: string) {
    return this.http
    .post<AuthResponseData>(
      this.baseUrl + 'signUp' + this.apiKey,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      ).pipe(
        catchError((e) => {
          let errorMessage =
            'Ha ocurrido un error al intentar registrar las presentes credenciales.';
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
}
