import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-searchbar',
  imports: [FormsModule],
  templateUrl: './searchbar.html',
  styleUrl: './searchbar.scss',
})
export class Searchbar {
  @Input() searchText: string = '';
  @Output() searchTextChange = new EventEmitter<string>();
  @Input() placeholder: string = '';

  onSearchChange() {
    this.searchText = this.searchText.trim();
    this.searchText = this.searchText.toLowerCase();
    this.searchTextChange.emit(this.searchText);
  }
}
