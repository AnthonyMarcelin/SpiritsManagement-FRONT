import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Navbar } from '../../shared/components/layout/navbar/navbar';
import { MainpageCardComponent } from './card/mainpage-card';
type AlcoholRoute = 'whisky' | 'biere' | 'rhum';

@Component({
  selector: 'app-mainpage',
  imports: [CommonModule, Navbar, MainpageCardComponent],
  templateUrl: './mainpage.html',
  styleUrl: './mainpage.scss',
})
export class Mainpage {
  alcohols: { label: string; img: string; route: AlcoholRoute }[] = [
    { label: 'Whisky', img: '/images/whisky-detoured.png', route: 'whisky' },
    { label: 'Bière', img: '/images/beer.jpg', route: 'biere' },
    { label: 'Rhum', img: '/images/rhum-detoured.png', route: 'rhum' },
  ];

  constructor(private router: Router) {}

  goTo(type: 'whisky' | 'biere' | 'rhum') {
    // Redirige vers la page de collection correspondante
    this.router.navigate(['/collection', type]);
  }
}
