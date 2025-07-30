import { DatePipe, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ApiService } from '../../core/services/api.service';
import { Editmodal } from '../../shared/components/editmodal/editmodal';

@Component({
  selector: 'app-profilepage',
  imports: [FormsModule, NgClass, DatePipe, Editmodal],
  templateUrl: './profilepage.html',
  styleUrl: './profilepage.scss',
})
export class Profilepage implements OnInit {
  user: any = {};
  async ngOnInit() {
    try {
      const response = await firstValueFrom(this.api.get('auth/me'));
      this.user = response;
    } catch (e) {
      console.error('Erreur lors de la récupération du user:', e);
      this.showProfileToast(
        'Impossible de récupérer les infos utilisateur.',
        false,
      );
    }
  }

  showToast = false;
  toastMessage = '';
  toastSuccess = true;
  toastTimeout: any;
  showEditModal = false;

  constructor(
    private api: ApiService,
    private router: Router,
  ) {}

  async onChangePassword() {
    try {
      await firstValueFrom(
        this.api.post('auth/forgot-password', { email: this.user.email }),
      );
      this.showProfileToast('Un email de réinitialisation a été envoyé.', true);
    } catch (e) {
      this.showProfileToast(
        "Erreur lors de l'envoi. Vérifiez l'adresse e-mail.",
        false,
      );
    }
  }

  goToMainpage(): void {
    this.router.navigate(['/mainpage']);
  }

  openEditModal() {
    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
  }

  async onEditField(payload: {
    field: string;
    value: string | File | { id: number };
  }) {
    // Ignore File and { id: number } cases since profile has no photo or complex select fields
    if (typeof payload.value !== 'string') {
      this.showProfileToast('This field cannot be modified here.', false);
      return;
    }
    try {
      await firstValueFrom(
        this.api.put('auth/me', { [payload.field]: payload.value }),
      );
      // Recharge le profil complet après modification
      const response = await firstValueFrom(this.api.get('auth/me'));
      this.user = response;
      this.showEditModal = false;
      this.showProfileToast('Modification enregistrée avec succès.', true);
    } catch (e) {
      this.showProfileToast('Erreur lors de la modification.', false);
    }
  }

  showProfileToast(message: string, success: boolean) {
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
