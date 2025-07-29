import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editmodal',
  imports: [FormsModule],
  templateUrl: './editmodal.html',
  styleUrl: './editmodal.scss',
})
export class Editmodal {
  @Input() title: string = '';
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() fieldId: string = 'editValue';
  @Input() value: string = '';
  @Input() fieldName: string = '';
  @Output() validate = new EventEmitter<{ field: string; value: string }>();
  @Output() cancel = new EventEmitter<void>();

  onValidate() {
    this.validate.emit({ field: this.fieldName, value: this.value });
  }

  onCancel() {
    this.cancel.emit();
  }
}
