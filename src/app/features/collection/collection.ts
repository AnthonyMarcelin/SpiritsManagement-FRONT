import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BeerService } from '../../core/services/collection/beer.service';
import { RhumService } from '../../core/services/collection/rhum.service';
import { WhiskyService } from '../../core/services/collection/whisky.service';
import { Navbar } from '../../shared/components/layout/navbar/navbar';
import { Searchbar } from '../../shared/components/searchbar/searchbar';
import { Sortbar } from '../../shared/components/sortbar/sortbar';
import { BottleCard } from './bottle-card/bottle-card';
@Component({
  selector: 'app-collection',
  imports: [Navbar, BottleCard, CommonModule, RouterModule, Searchbar, Sortbar],
  templateUrl: './collection.html',
  styleUrl: './collection.scss',
})
export class Collection {
  searchText: string = '';
  alcool: string = '';
  bottles: any[] = [];
  filteredBottles: any[] = [];
  sortCriteria: string = 'name';
  sortOrder: string = 'asc';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private whiskyService: WhiskyService,
    private beerService: BeerService,
    private rhumService: RhumService,
  ) {}

  onBottleClick(id: string) {
    this.router.navigate(['/collection', this.alcool, 'bottle', id]);
  }

  ngOnInit() {
    this.alcool = this.route.snapshot.params['alcool'];

    if (this.alcool === 'whisky') {
      this.whiskyService.getAllWhisky().subscribe((bottles) => {
        this.bottles = bottles;
        this.filteredBottles = bottles;
        this.applySort();
      });
    }

    if (this.alcool === 'beer') {
      this.beerService.getAllBeer().subscribe((bottles) => {
        this.bottles = bottles;
        this.filteredBottles = bottles;
        this.applySort();
      });
    }

    if (this.alcool === 'rhum') {
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

  goToAddBottle() {
    if (this.alcool) {
      this.router.navigate(['/' + this.alcool + '/add_bottle']);
    } else {
      this.router.navigate(['/add_bottle']);
    }
  }

  getCollectionTitle(): string {
    switch (this.alcool) {
      case 'whisky':
        return 'whiskies';
      case 'beer':
        return 'bières';
      case 'rhum':
        return 'rhums';
      default:
        return 'collection';
    }
  }

  getGenderPrefix(): string {
    return this.alcool === 'beer' ? 'chacune' : 'chacun';
  }
}
