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
      this.message = 'Un email de réinitialisation a été envoyé.';
    } catch (e) {
      console.error('[FORGOT PASSWORD] Erreur API :', e);
      this.message = "Erreur lors de l'envoi. Vérifiez l'adresse e-mail.";
    }
    this.loading = false;
  }
}
