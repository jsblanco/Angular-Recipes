import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Store } from '@ngrx/store';

import * as fromRoot from './store/app.reducer';
import * as AuthActions from './auth/store/auth.actions';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  constructor(private auth: AuthService, private store: Store<fromRoot.AppState>){}

  ngOnInit(){
    this.store.dispatch(AuthActions.AutoLogin())
    //this.auth.autoLogin();
  }

}
