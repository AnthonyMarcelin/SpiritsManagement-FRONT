import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterModule],
  standalone: true,
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  pseudo = '';
  firstName = '';
  lastName = '';
  email = '';
  password = '';
  confirmPassword = '';
  error = '';
  submitted = false;

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  onSubmit() {
    this.submitted = true;
    console.log(
      'submitted:',
      this.submitted,
      'password:',
      this.password,
      'confirmPassword:',
      this.confirmPassword,
    );
    if (this.password !== this.confirmPassword) {
      this.error = 'Les mots de passe ne correspondent pas.';
      return;
    }
    this.error = '';
    this.auth
      .register({
        pseudo: this.pseudo,
        firstname: this.firstName,
        lastname: this.lastName,
        email: this.email,
        password: this.password,
        isAdmin: false,
      })
      .subscribe({
        next: () => {
          console.log('Registration successful');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Registration failed', err);
          this.error = "Erreur lors de l'inscription";
        },
      });
    console.log('Registration successful for:', this.email);
  }
}
