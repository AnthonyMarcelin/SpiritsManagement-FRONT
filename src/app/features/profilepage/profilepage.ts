import { DatePipe, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ApiService } from '../../core/services/api.service';
import { Editmodal } from '../../shared/components/editmodal/editmodal';
import { Passwordmodal } from '../../shared/components/passwordmodal/passwordmodal';

@Component({
  selector: 'app-profilepage',
  imports: [FormsModule, NgClass, DatePipe, Editmodal, Passwordmodal],
  templateUrl: './profilepage.html',
  styleUrls: ['./profilepage.scss'],
})
export class Profilepage implements OnInit {
  user: any = {};
  showChangePasswordModal: boolean = false;
  currentPassword: string = '';
  newPassword: string = '';
  confirmNewPassword: string = '';
  passwordError: string = '';
  passwordLoading: boolean = false;
  passwordRules: string[] = [
    'Au moins 8 caractères',
    'Une majuscule',
    'Une minuscule',
    'Un chiffre',
    'Un caractère spécial',
  ];
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

      const response = await firstValueFrom(this.api.get('auth/me'));

      this.user = response;

      this.showEditModal = false;

      this.showProfileToast('Modification enregistrée avec succès.', true);
    } catch (e) {
      this.showProfileToast('Erreur lors de la modification.', false);
    }
  }

  openChangePasswordModal() {
    this.passwordError = '';
    this.showChangePasswordModal = true;
    this.currentPassword = '';
    this.newPassword = '';
    this.confirmNewPassword = '';
  }

  closeChangePasswordModal() {
    this.showChangePasswordModal = false;
    this.passwordLoading = false;
    this.passwordError = '';
  }

  validatePassword(password: string): boolean {
    // Vérifie les modalités du mot de passe
    const rules = [/.{8,}/, /[A-Z]/, /[a-z]/, /[0-9]/, /[^A-Za-z0-9]/];
    return rules.every((rule) => rule.test(password));
  }

  onChangePasswordSubmit(payload: any) {
    // Filtrer les événements natifs
    if (
      !payload ||
      typeof payload !== 'object' ||
      !(
        'currentPassword' in payload &&
        'newPassword' in payload &&
        'confirmNewPassword' in payload
      )
    ) {
      return;
    }
    this.passwordError = '';
    const { currentPassword, newPassword, confirmNewPassword } = payload;
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      this.passwordError = 'Tous les champs sont obligatoires.';
      return;
    }
    if (newPassword !== confirmNewPassword) {
      this.passwordError = 'Les mots de passe ne correspondent pas.';
      return;
    }
    if (!this.validatePassword(newPassword)) {
      this.passwordError = 'Le mot de passe ne respecte pas les modalités.';
      return;
    }
    // Réinitialisation immédiate avant l'appel API
    this.passwordError = '';
    this.passwordLoading = true;
    firstValueFrom(
      this.api.put('auth/change-password', {
        currentPassword,
        newPassword,
      }),
    )
      .then(() => {
        setTimeout(() => {
          this.closeChangePasswordModal();
          this.showProfileToast('Mot de passe modifié avec succès.', true);
        }, 0);
      })
      .catch(() => {
        this.passwordError = 'Erreur lors de la modification du mot de passe.';
      })
      .finally(() => {
        this.passwordLoading = false;
      });
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
