import { Component, ComponentFactoryResolver, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertComponent } from '../alert/alert.component';
import { PlaceholderDirective } from '../common/placeholder.directive';
import { Store } from '@ngrx/store';
import * as fromRoot from '../store/app.reducer'
import * as AuthActions from './store/auth.actions'
import {
  Subscription,
  //Observable 
} from 'rxjs';
//import { AuthService, AuthResponseData } from 'src/app/services/auth.service';
//import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {

  public isLoggingIn = true;
  public isLoading = false;
  public error: String = null;
  @ViewChild(PlaceholderDirective) alertPlaceholder: PlaceholderDirective;
  private alertSubscription: Subscription;
  private storeSub: Subscription;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private store: Store<fromRoot.AppState>
    // private authService: AuthService,
    // private router: Router,
  ) { }

  onChangeMode() {
    this.isLoggingIn = !this.isLoggingIn;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) return;
    const { email, password } = form.value;
    this.error = null;
    //this.isLoading = true;
    //let authObs: void | Observable<AuthResponseData>;

    this.isLoggingIn
      ? this.store.dispatch(AuthActions.LoginStart({ email, password }))
      : this.store.dispatch(AuthActions.SignUp({ email, password }));//(authObs = this.authService.signup(email, password));
    //this.authService.login(email, password))
    // authObs.subscribe(
    //   (response) => {
    //     this.isLoading = false;
    //     this.router.navigate(['/recipes']);
    //   },
    //   (e) => {
    //     this.isLoading = false;
    //     this.error = e;
    //     this.showErrorAlert(e);
    //   }
    // );

    form.reset();
  }

  ngOnInit() {
    this.storeSub = this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
      if (!!this.error) this.showErrorAlert(this.error + '')
    })
  }

  ngOnDestroy() {
    if (!!this.storeSub) this.storeSub.unsubscribe();
    if (!!this.alertSubscription) this.alertSubscription.unsubscribe();
  }

  private showErrorAlert(errorMessage: string) {
    const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    this.alertPlaceholder.viewContainerRef.clear();
    const alertComponent = this.alertPlaceholder.viewContainerRef.createComponent(alertComponentFactory);
    alertComponent.instance.message = errorMessage;
    this.alertSubscription = alertComponent.instance.close.subscribe(() => {
      this.store.dispatch(AuthActions.ClearError());
      this.alertSubscription.unsubscribe();
      this.alertPlaceholder.viewContainerRef.clear();
    })
  }


  // onCloseAlert() {
  //   this.error = null;
  // }

}
