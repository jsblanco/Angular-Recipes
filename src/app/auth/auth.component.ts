import { Component, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from 'src/app/services/auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../alert/alert.component';
import { PlaceholderDirective } from '../common/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnDestroy {

  public isLoggingIn = true;
  public isLoading = false;
  public error: String = null;
  @ViewChild(PlaceholderDirective) alertPlaceholder: PlaceholderDirective;
  private alertSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  onChangeMode() {
    this.isLoggingIn = !this.isLoggingIn;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) return;
    const { email, password } = form.value;
    this.isLoading = true;
    this.error = null;
    let authObs: Observable<AuthResponseData>;

    this.isLoggingIn
      ? (authObs = this.authService.login(email, password))
      : (authObs = this.authService.signup(email, password));

    authObs.subscribe(
      (response) => {
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      (e) => {
        this.isLoading = false;
        this.error = e;
        this.showErrorAlert(e);
      }
    );

    form.reset();
  }

  private showErrorAlert(errorMessage: string) {
    const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    this.alertPlaceholder.viewContainerRef.clear();
    const alertComponent = this.alertPlaceholder.viewContainerRef.createComponent(alertComponentFactory);
    alertComponent.instance.message = errorMessage;
    this.alertSubscription = alertComponent.instance.close.subscribe(() => {
      this.alertSubscription.unsubscribe();
      this.alertPlaceholder.viewContainerRef.clear();
    })
  }

  ngOnDestroy() {
    if (!!this.alertSubscription) this.alertSubscription.unsubscribe();
  }

  // onCloseAlert() {
  //   this.error = null;
  // }

}
