import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Navbar } from '../../shared/components/layout/navbar/navbar';

@Component({
  selector: 'app-mainpage',
  imports: [Navbar],
  templateUrl: './mainpage.html',
  styleUrl: './mainpage.scss',
})
export class Mainpage {
  constructor(private router: Router) {}

  goTo(type: 'whisky' | 'biere' | 'rhum') {
    // Redirige vers la page de collection correspondante
    this.router.navigate(['/collection', type]);
  }
}
