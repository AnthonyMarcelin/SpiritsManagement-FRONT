import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.html',
  styleUrls: ['./reset-password.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class ResetPasswordComponent {
  password = '';
  confirmPassword = '';
  message = '';
  loading = false;
  token = '';

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
  }

  async onSubmit() {
    if (this.password !== this.confirmPassword) {
      this.message = 'Les mots de passe ne correspondent pas.';
      return;
    }
    this.loading = true;
    this.message = '';
    try {
      const response = await firstValueFrom(
        this.api.post('auth/reset-password', {
          token: this.token,
          newPassword: this.password,
        }),
      );
      console.log('[RESET PASSWORD] Réponse backend :', response);
      this.message = 'Mot de passe réinitialisé avec succès.';
      setTimeout(() => this.router.navigate(['/login']), 2000);
    } catch (e) {
      console.error('[RESET PASSWORD] Erreur API :', e);
      this.message = 'Erreur lors de la réinitialisation.';
    }
    this.loading = false;
  }
}
