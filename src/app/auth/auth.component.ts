import { Component, OnInit } from '@angular/core';
import { NgForm, EmailValidator } from '@angular/forms';
import { AuthService, AuthResponseData } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isLoggingIn = true;
  isLoading = false;
  error: String = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

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
        this.router.navigate(['/recipes'])
      },
      (e) => {
        this.isLoading = false;
        this.error = e;
      }
    );

    form.reset();
  }
}
