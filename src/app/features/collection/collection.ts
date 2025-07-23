import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BeerService } from '../../core/services/collection/beer.service';
import { RhumService } from '../../core/services/collection/rhum.service';
import { WhiskyService } from '../../core/services/collection/whisky.service';
import { Navbar } from '../../shared/components/layout/navbar/navbar';
import { Optionbar } from '../../shared/components/optionbar/optionbar';
import { Searchbar } from '../../shared/components/searchbar/searchbar';
import { Sortbar } from '../../shared/components/sortbar/sortbar';
import { BottleCard } from './bottle-card/bottle-card';
@Component({
  selector: 'app-collection',
  imports: [Searchbar, Optionbar, Sortbar, Navbar, BottleCard, CommonModule],
  templateUrl: './collection.html',
  styleUrl: './collection.scss',
})
export class Collection {
  searchText: string = '';
  type: string = '';
  bottles: any[] = [];
  filteredBottles: any[] = [];
  sortCriteria: string = 'name';
  sortOrder: string = 'asc';

  constructor(
    private route: ActivatedRoute,
    private whiskyService: WhiskyService,
    private beerService: BeerService,
    private rhumService: RhumService,
  ) {}

  ngOnInit() {
    this.type = this.route.snapshot.params['type'];

    if (this.type === 'whisky') {
      this.whiskyService.getAllWhisky().subscribe((bottles) => {
        this.bottles = bottles;
        this.filteredBottles = bottles;
        this.applySort();
      });
    }
    if (this.type === 'biere') {
      this.beerService.getAllBeer().subscribe((bottles) => {
        this.bottles = bottles;
        this.filteredBottles = bottles;
        this.applySort();
      });
    }
    if (this.type === 'rhum') {
      this.rhumService.getAllRhum().subscribe((bottles) => {
        this.bottles = bottles;
        this.filteredBottles = bottles;
        this.applySort();
      });
    }
  }

  onSearchChange() {
    const search = this.searchText.trim().toLowerCase();
    if (!search) {
      this.filteredBottles = this.bottles;
      this.applySort();
      return;
    }
    this.filteredBottles = this.bottles.filter((bottle) => {
      return bottle.name && bottle.name.toLowerCase().startsWith(search);
    });
    this.applySort();
  }

  onSortChange(event: { criteria: string; order: string }) {
    this.sortCriteria = event.criteria;
    this.sortOrder = event.order;
    this.applySort();
  }

  applySort() {
    const arr = [...this.filteredBottles];
    arr.sort((a, b) => {
      let valA, valB;
      switch (this.sortCriteria) {
        case 'name':
          valA = a.name?.toLowerCase() || '';
          valB = b.name?.toLowerCase() || '';
          break;
        case 'date':
          valA = new Date(a.createdAt || a.date || 0).getTime();
          valB = new Date(b.createdAt || b.date || 0).getTime();
          break;
        case 'note':
          valA = a.note ?? -1;
          valB = b.note ?? -1;
          break;
        case 'price':
          valA = a.price ?? 0;
          valB = b.price ?? 0;
          break;
        default:
          valA = a.name?.toLowerCase() || '';
          valB = b.name?.toLowerCase() || '';
      }
      if (valA < valB) return this.sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return this.sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
    this.filteredBottles = arr;
  }
}
