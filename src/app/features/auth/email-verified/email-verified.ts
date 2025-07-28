import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-email-verified',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './email-verified.html',
  styleUrls: ['./email-verified.scss'],
})
export class EmailVerifiedPage implements OnInit {
  status: 'pending' | 'success' | 'error' = 'pending';
  message = '';
  resendEmail = '';
  showSuccessToast = false;
  successToastMessage = '';
  showErrorToast = false;
  errorToastMessage = '';
  errorToastTimeout: any;
  onResendVerification() {
    if (!this.resendEmail) return;
    firstValueFrom(
      this.http.post(`${environment.apiUrl}/auth/resend-verification`, {
        email: this.resendEmail,
      }),
    )
      .then(() => {
        this.successToastMessage =
          'Email de validation renvoyé. Vérifiez votre boîte mail.';
        this.showSuccessToast = true;
        setTimeout(() => {
          this.showSuccessToast = false;
        }, 4000);
      })
      .catch((err: any) => {
        this.errorToastMessage =
          err?.error?.error || 'Erreur lors de l’envoi du mail.';
        this.showErrorToast = true;
        if (this.errorToastTimeout) clearTimeout(this.errorToastTimeout);
        this.errorToastTimeout = setTimeout(() => {
          this.showErrorToast = false;
        }, 4000);
      });
  }

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(async (params) => {
      const token = params['token'];
      if (!token) {
        this.status = 'error';
        this.message = 'Lien de validation invalide.';
        return;
      }
      try {
        const res: any = await firstValueFrom(
          this.http.get(
            `${environment.apiUrl}/auth/verify-email?token=${token}`,
          ),
        );
        this.status = 'success';
        this.message =
          res?.message ||
          'Votre email a été vérifié ! Votre compte est maintenant activé.';
      } catch (err: any) {
        this.status = 'error';
        this.message =
          err?.error?.error ||
          err?.error?.message ||
          'Erreur lors de la validation du mail.';
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
