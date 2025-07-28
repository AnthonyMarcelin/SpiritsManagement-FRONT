import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
})
export class Login {
  email = '';
  password = '';

  error = '';
  showToast = false;
  toastMessage = '';
  toastTimeout: any;

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  showToastMessage(message: string) {
    this.toastMessage = message;
    this.showToast = true;
    if (this.toastTimeout) clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      this.showToast = false;
    }, 4000);
  }

  onSubmit() {
    this.auth.login({ email: this.email, password: this.password }).subscribe({
      next: () => {
        console.log('login ok');
        this.auth.getMe().subscribe({
          next: (user) => {
            console.log('Utilisateur courant récupéré:', user);
            this.router.navigate(['/mainpage']);
          },
          error: (err) => {
            console.error('Erreur getMe après login:', err);
            this.error = 'Erreur lors de la récupération du profil';
          },
        });
      },
      error: (err) => {
        if (err.status === 429) {
          this.showToastMessage('Trop de tentatives. Réessayez dans 1 minute.');
        } else if (
          err.status === 403 ||
          (err.error &&
            err.error.message &&
            err.error.message.toLowerCase().includes('non vérifié'))
        ) {
          this.showToastMessage(
            'Compte non vérifié. Merci de valider votre adresse e-mail avant de vous connecter.',
          );
        } else if (err.status === 401) {
          this.error = 'Identifiants invalides';
        } else {
          this.error = '';
        }
      },
    });
  }
}
