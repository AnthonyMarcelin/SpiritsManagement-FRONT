import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BeerService } from '../../core/services/collection/beer.service';
import { RhumService } from '../../core/services/collection/rhum.service';
import { WhiskyService } from '../../core/services/collection/whisky.service';
import { Navbar } from '../../shared/components/layout/navbar/navbar';
import { MainpageCardComponent } from './card/mainpage-card';
type AlcoholRoute = 'whisky' | 'beer' | 'rhum';

@Component({
  selector: 'app-mainpage',
  imports: [CommonModule, Navbar, MainpageCardComponent],
  templateUrl: './mainpage.html',
  styleUrl: './mainpage.scss',
})
export class Mainpage {
  alcohols: {
    label: string;
    img: string;
    route: AlcoholRoute;
    count: number;
    getText: (count: number) => string;
  }[] = [
    {
      label: 'Whisky',
      img: '/images/whisky.jpg',
      route: 'whisky',
      count: 0,
      getText: (count: number) =>
        `J'ai ${count} bouteille${count === 1 ? '' : 's'} dans mon bar`,
    },
    {
      label: 'Bière',
      img: '/images/beer.jpg',
      route: 'beer',
      count: 0,
      getText: (count: number) =>
        `J'ai ${count} bière${count === 1 ? '' : 's'} au frais`,
    },
    {
      label: 'Rhum',
      img: '/images/rhum.jpg',
      route: 'rhum',
      count: 0,
      getText: (count: number) =>
        `J'ai ${count} bouteille${count === 1 ? '' : 's'} dans ma calle`,
    },
  ];

  constructor(
    private router: Router,
    private whiskyService: WhiskyService,
    private beerService: BeerService,
    private rumService: RhumService,
  ) {}

  ngOnInit() {
    this.whiskyService
      .getAllWhisky()
      .subscribe((list) => (this.alcohols[0].count = list.length));
    this.beerService
      .getAllBeer()
      .subscribe((list) => (this.alcohols[1].count = list.length));
    this.rumService
      .getAllRhum()
      .subscribe((list) => (this.alcohols[2].count = list.length));
  }

  goTo(type: 'whisky' | 'beer' | 'rhum') {
    this.router.navigate(['/collection', type]);
  }
}
