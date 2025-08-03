import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TypeService } from '../../../core/services/bottle/type.service';

@Component({
  selector: 'app-bottle-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bottle-card.html',
  styleUrls: ['./bottle-card.scss'],
})
export class BottleCard implements OnInit {
  @Input() bottle?: {
    id: string;
    name: string;
    photo: string;
    note: number;
    price?: number;
    type?: string;
    typeId?: number;
  };

  @Output() bottleClick = new EventEmitter<string>();

  typeName: string = '';

  constructor(private typeService: TypeService) {}

  ngOnInit() {
    if (this.bottle?.typeId && !this.bottle?.type) {
      this.typeService.getTypeById(this.bottle.typeId).subscribe({
        next: (typeData) => {
          this.typeName = typeData.name;
        },
        error: (err) => {
          console.error('Error fetching type:', err);
          this.typeName = `Type ${this.bottle?.typeId}`;
        },
      });
    }
  }

  onCardClick() {
    if (this.bottle?.id) {
      this.bottleClick.emit(this.bottle.id);
    }
  }
}
