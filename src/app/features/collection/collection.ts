import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BeerService } from '../../core/services/collection/beer.service';
import { RhumService } from '../../core/services/collection/rhum.service';
import { WhiskyService } from '../../core/services/collection/whisky.service';
import { Filterbar } from '../../shared/components/filterbar/filterbar';
import { Navbar } from '../../shared/components/layout/navbar/navbar';
import { Optionbar } from '../../shared/components/optionbar/optionbar';
import { Searchbar } from '../../shared/components/searchbar/searchbar';
import { BottleCard } from './bottle-card/bottle-card';
@Component({
  selector: 'app-collection',
  imports: [Searchbar, Optionbar, Filterbar, Navbar, BottleCard, CommonModule],
  templateUrl: './collection.html',
  styleUrl: './collection.scss',
})
export class Collection {
  searchText: string = '';
  type: string = '';
  bottles: any[] = [];
  filteredBottles: any[] = [];

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
      });
    }
    if (this.type === 'biere') {
      this.beerService.getAllBeer().subscribe((bottles) => {
        this.bottles = bottles;
        this.filteredBottles = bottles;
      });
    }
    if (this.type === 'rhum') {
      this.rhumService.getAllRhum().subscribe((bottles) => {
        this.bottles = bottles;
        this.filteredBottles = bottles;
      });
    }
  }
}
