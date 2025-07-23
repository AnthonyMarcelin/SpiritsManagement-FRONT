import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sortbar',
  imports: [FormsModule],
  templateUrl: './sortbar.html',
  styleUrl: './sortbar.scss',
})
export class Sortbar {
  sortCriteria: string = 'name';
  sortOrder: string = 'asc';

  @Output() sortChange = new EventEmitter<{
    criteria: string;
    order: string;
  }>();

  sortOption: string = 'name-asc';

  onSortChange() {
    const [criteria, order] = this.sortOption.split('-');
    this.sortChange.emit({ criteria, order });
  }
}
