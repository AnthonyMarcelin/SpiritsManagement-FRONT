import { CommonModule, DecimalPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-bottle-card',
  standalone: true,
  imports: [CommonModule, DecimalPipe],
  templateUrl: './bottle-card.html',
  styleUrls: ['./bottle-card.scss'],
})
export class BottleCard {
  @Input() bottle?: {
    id: string;
    name: string;
    photo: string;
    note: number;
    price?: number;
  };

  @Output() bottleClick = new EventEmitter<string>();

  onCardClick() {
    if (this.bottle?.id) {
      this.bottleClick.emit(this.bottle.id);
    }
  }
}
