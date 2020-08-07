import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRoot from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions'
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {

  @Input() message: String;
  @Output() close = new EventEmitter<void>();

  constructor(private store: Store) { }

  onClose(){
    //this.store.dispatch(AuthActions.ClearError())
    this.close.emit();
  }

}
