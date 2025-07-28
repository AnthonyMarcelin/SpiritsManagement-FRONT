import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterModule, CommonModule],
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
  showSuccessToast = false;
  successToastMessage = '';

  passwordCriteria = {
    minLength: false,
    uppercase: false,
    lowercase: false,
    digit: false,
    special: false,
  };

  get passwordCriteriaList() {
    return [
      {
        label: 'Au moins 8 caractères',
        valid: this.passwordCriteria.minLength,
      },
      { label: 'Une majuscule', valid: this.passwordCriteria.uppercase },
      { label: 'Une minuscule', valid: this.passwordCriteria.lowercase },
      { label: 'Un chiffre', valid: this.passwordCriteria.digit },
      { label: 'Un caractère spécial', valid: this.passwordCriteria.special },
    ];
  }

  validatePasswordCriteria(password: string) {
    this.passwordCriteria.minLength = password.length >= 8;
    this.passwordCriteria.uppercase = /[A-Z]/.test(password);
    this.passwordCriteria.lowercase = /[a-z]/.test(password);
    this.passwordCriteria.digit = /[0-9]/.test(password);
    this.passwordCriteria.special = /[^A-Za-z0-9]/.test(password);
  }

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  onPasswordInput(event: any) {
    this.password = event.target.value;
    this.validatePasswordCriteria(this.password);
  }

  onSubmit() {
    this.submitted = true;
    this.validatePasswordCriteria(this.password);
    if (this.password !== this.confirmPassword) {
      this.error = 'Les mots de passe ne correspondent pas.';
      return;
    }
    // Vérifie que tous les critères sont remplis
    const allValid = Object.values(this.passwordCriteria).every(Boolean);
    if (!allValid) {
      this.error = 'Le mot de passe ne respecte pas tous les critères.';
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
        next: (res: any) => {
          this.successToastMessage =
            'Inscription réussie ! Vérifiez vos mails pour activer votre compte.';
          this.showSuccessToast = true;
          setTimeout(() => {
            this.showSuccessToast = false;
            this.router.navigate(['/login']);
          }, 3500);
        },
        error: (err) => {
          this.error = "Erreur lors de l'inscription";
        },
      });
  }
}
