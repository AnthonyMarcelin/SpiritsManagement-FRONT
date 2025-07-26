import { CommonModule, DecimalPipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bottle-card',
  standalone: true,
  imports: [CommonModule, DecimalPipe],
  templateUrl: './bottle-card.html',
  styleUrls: ['./bottle-card.scss'],
})
export class BottleCard {
  @Input() bottle?: {
    name: string;
    photo: string;
    note: number;
    price?: number;
  };
}
