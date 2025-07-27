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
  showSuccessToast = false;
  successToastMessage = '';

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  onSubmit() {
    this.submitted = true;
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
