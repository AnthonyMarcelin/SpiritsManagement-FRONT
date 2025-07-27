import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-email-verified',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './email-verified.html',
  styleUrls: ['./email-verified.scss'],
})
export class EmailVerifiedPage implements OnInit {
  status: 'pending' | 'success' | 'error' = 'pending';
  message = '';

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
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3500);
      } catch (err: any) {
        this.status = 'error';
        this.message =
          err?.error?.error ||
          err?.error?.message ||
          'Erreur lors de la validation du mail.';
      }
    });
  }
}
