import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bottle-card',
  imports: [],
  templateUrl: './bottle-card.html',
  styleUrl: './bottle-card.scss',
})
export class BottleCard {
  @Input() bottle: { name: string; photo: string; note: number } | undefined;
}
