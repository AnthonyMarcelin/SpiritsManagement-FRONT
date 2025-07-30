import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editmodal',
  imports: [CommonModule, FormsModule],
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
  @Input() options: Array<{
    id?: number;
    name?: string;
    label?: string;
    value?: string;
  }> = [];
  @Output() validate = new EventEmitter<{
    field: string;
    value: string | File | { id: number };
  }>();
  @Output() cancel = new EventEmitter<void>();

  onValidate() {
    if (this.fieldName === 'photo' && this.selectedFile) {
      this.validate.emit({ field: this.fieldName, value: this.selectedFile });
    } else {
      this.validate.emit({ field: this.fieldName, value: this.value });
    }
  }

  selectedFile?: File;
  previewUrl?: string;

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrl = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
    } else {
      this.previewUrl = undefined;
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}
