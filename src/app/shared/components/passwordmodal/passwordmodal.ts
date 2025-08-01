import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-passwordmodal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './passwordmodal.html',
  styleUrl: './passwordmodal.scss',
})
export class Passwordmodal {
  @Input() passwordError: string = '';
  @Input() passwordLoading: boolean = false;
  @Input() passwordRules: string[] = [];

  currentPassword: string = '';
  newPassword: string = '';
  confirmNewPassword: string = '';

  passwordCriteria = {
    minLength: false,
    uppercase: false,
    lowercase: false,
    digit: false,
    special: false,
  };

  get passwordCriteriaList() {
    return [
      {
        label: 'Au moins 8 caractères',
        valid: this.passwordCriteria.minLength,
      },
      { label: 'Une majuscule', valid: this.passwordCriteria.uppercase },
      { label: 'Une minuscule', valid: this.passwordCriteria.lowercase },
      { label: 'Un chiffre', valid: this.passwordCriteria.digit },
      { label: 'Un caractère spécial', valid: this.passwordCriteria.special },
    ];
  }

  validatePasswordCriteria(password: string) {
    this.passwordCriteria.minLength = password.length >= 8;
    this.passwordCriteria.uppercase = /[A-Z]/.test(password);
    this.passwordCriteria.lowercase = /[a-z]/.test(password);
    this.passwordCriteria.digit = /[0-9]/.test(password);
    this.passwordCriteria.special = /[^A-Za-z0-9]/.test(password);
  }

  onNewPasswordInput(event: any) {
    this.newPassword = event.target.value;
    this.validatePasswordCriteria(this.newPassword);
  }

  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<{
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  }>();

  onSubmit() {
    this.submit.emit({
      currentPassword: this.currentPassword,
      newPassword: this.newPassword,
      confirmNewPassword: this.confirmNewPassword,
    });
  }
}
