import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  mode: 'login' | 'register' | 'forgot' = 'login';

  showPassword = false;

  email = '';
  password = '';

  registerName = '';
  registerEmail = '';
  registerPhone = '';
  registerPassword = '';
  registerRole = 'CUSTOMER';

  forgotEmail = '';

  errorMessage = '';
  successMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

login(): void {

  this.errorMessage = '';

  this.authService.login(
    this.email,
    this.password
  ).subscribe({

    next: (token: string) => {

      console.log('LOGIN SUCCESS');

      localStorage.setItem(
        'token',
        token
      );

      this.router.navigate(['/home']);

    },

    error: (error) => {

      console.error('LOGIN ERROR:', error);

      this.errorMessage =
        'Invalid Email or Password';

    }

  });

  next: (token: string) => {

  localStorage.setItem('token', token);

  localStorage.setItem(
    'user',
    JSON.stringify({
      name: this.email.split('@')[0],
      email: this.email
    })
  );

  this.router.navigate(['/home']);

}
}

  register(): void {

    this.errorMessage = '';
    this.successMessage = '';

    const user = {

      name: this.registerName,

      email: this.registerEmail,

      phone: this.registerPhone,

      password: this.registerPassword,

      role: this.registerRole

    };

    this.authService.register(user).subscribe({

      next: () => {

        this.successMessage =
          'Registration successful!';

        setTimeout(() => {

          this.mode = 'login';

          this.email = this.registerEmail;

          this.successMessage = '';

        }, 1500);

      },

      error: (error) => {

        console.error(error);

        this.errorMessage =
          'Registration failed';

      }

    });

  }

  forgotPassword(): void {

    this.errorMessage = '';
    this.successMessage = '';

    if (!this.forgotEmail) {

      this.errorMessage =
        'Please enter your email';

      return;

    }

    this.authService
      .forgotPassword(this.forgotEmail)
      .subscribe({

        next: () => {

          this.successMessage =
            'Password reset link sent to your email';

        },

        error: () => {

          this.errorMessage =
            'Email not found';

        }

      });

  }

}