import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-deletemodal',
  imports: [FormsModule],
  templateUrl: './deletemodal.html',
  styleUrl: './deletemodal.scss',
})
export class Deletemodal {
  @Input() title: string = '';
  @Input() message: string = '';
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm() {
    this.confirm.emit();
  }

  onCancel() {
    this.cancel.emit();
  }
}
