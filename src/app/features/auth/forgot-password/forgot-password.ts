import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.html',
  styleUrls: ['./forgot-password.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class ForgotPasswordComponent {
  email = '';
  message = '';
  loading = false;

  showToast = false;
  toastMessage = '';
  toastSuccess = false;
  toastTimeout: any;

  constructor(private api: ApiService) {}

  async onSubmit(event: Event) {
    event.preventDefault();
    this.loading = true;
    this.message = '';
    console.log('[FORGOT PASSWORD] Appel API avec email :', this.email);
    try {
      const response = await firstValueFrom(
        this.api.post('auth/forgot-password', { email: this.email }),
      );
      console.log('[FORGOT PASSWORD] Réponse backend :', response);
      this.showForgotToast('Un email de réinitialisation a été envoyé.', true);
    } catch (e) {
      console.error('[FORGOT PASSWORD] Erreur API :', e);
      this.showForgotToast(
        "Erreur lors de l'envoi. Vérifiez l'adresse e-mail.",
        false,
      );
    }
    this.loading = false;
  }

  showForgotToast(message: string, success: boolean) {
    this.toastMessage = message;
    this.toastSuccess = success;
    this.showToast = true;
    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
    }
    this.toastTimeout = setTimeout(() => {
      this.showToast = false;
    }, 3500);
  }
}
