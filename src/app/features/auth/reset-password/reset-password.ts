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
  loading = false;
  token = '';

  showToast = false;
  toastMessage = '';
  toastSuccess = false;
  toastTimeout: any;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
  }

  showResetToast(message: string, success: boolean) {
    this.toastMessage = message;
    this.toastSuccess = success;
    this.showToast = true;
    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      this.showToast = false;
      if (success) this.router.navigate(['/login']);
    }, 2200);
  }

  async onSubmit() {
    if (this.password !== this.confirmPassword) {
      this.showResetToast('Les mots de passe ne correspondent pas.', false);
      return;
    }
    this.loading = true;
    try {
      const response = await firstValueFrom(
        this.api.post('auth/reset-password', {
          token: this.token,
          newPassword: this.password,
        }),
      );
      console.log('[RESET PASSWORD] Réponse backend :', response);
      this.showResetToast('Mot de passe réinitialisé avec succès.', true);
    } catch (e) {
      console.error('[RESET PASSWORD] Erreur API :', e);
      this.showResetToast('Erreur lors de la réinitialisation.', false);
    }
    this.loading = false;
  }
}
