import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  isFilled: boolean = false;
  submitted = false;
  isChecked: boolean = false;
  loginSuccess: boolean = false;
  loginError: boolean = false;
  loginErrorText: string = '';
  showPassword: boolean = false;
  loading: boolean = false;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {}

  ngOnDestroy() {}

  checkVal() {
    if (this.loginForm.value.email && this.loginForm.value.password) {
      this.isFilled = true;
    }
  }

  toggleEditable(event: any) {
    if (event.target.checked) {
      this.isChecked = true;
    } else {
      this.isChecked = false;
    }
    console.log(this.isChecked);
  }

  public togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    this.loading = true;
    if (
      this.loginForm.value.email &&
      this.loginForm.value.password &&
      this.isChecked
    ) {
      this.authenticationService
        .login(this.loginForm.value.email, this.loginForm.value.password)
        .subscribe(
          (data: any) => {
            this.loading = false;
            this.loginSuccess = true;
            setTimeout(() => {
              this.loginSuccess = false;
              localStorage.setItem('userToken', data?.token);
              this.router.navigate(['welcome']);
            }, 3000);
            //console.log(data?.token)
          },
          (err) => {
            this.loading = false;
            this.loginErrorText = 'Unable to login';
            this.loginError = true;
            setTimeout(() => {
              this.loginError = false;
            }, 2000);
            console.log(err);
          }
        );
    } else {
      this.loading = false;
      this.loginErrorText = 'Please fill all fields.';
      this.loginError = true;
      setTimeout(() => {
        this.loginError = false;
      }, 2000);
      console.log('Error');
    }
  }
}
