import { Component, OnInit } from '@angular/core';
import { NgForm, EmailValidator } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isLoggingIn = false;
  isLoading = false;
  error: String = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onChangeMode() {
    this.isLoggingIn = !this.isLoggingIn;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) return;
    this.isLoading = true;
    this.error = null;
    const { email, password } = form.value;
    this.isLoggingIn
      ? (this.isLoading = false)
      : this.authService.signup(email, password).subscribe(
          (response) => {
            this.isLoading = false;
            console.log(response);
          },
          (e) => {
            this.isLoading = false;
            this.error=e;
          }
        );

    form.reset();
  }
}
