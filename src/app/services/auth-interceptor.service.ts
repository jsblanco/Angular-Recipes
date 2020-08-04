import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpParams,
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { take, exhaustMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromRoot from '../store/app.reducer'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private auth: AuthService, private store: Store<fromRoot.AppState>) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    //return this.auth.loggedUser.pipe( 
    return this.store.select('auth').pipe(
      take(1),
      map(authState => authState.user),
      exhaustMap((user) => {
        if (!user) return next.handle(request);
        const modifiedRequest = request.clone({
          params: new HttpParams().set('auth', user.token),
        });
        return next.handle(modifiedRequest);
      })
    );
  }
}
