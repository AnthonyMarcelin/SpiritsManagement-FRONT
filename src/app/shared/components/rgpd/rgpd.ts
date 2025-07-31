import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FooterComponent } from '../footer/footer';

@Component({
  selector: 'app-rgpd',
  templateUrl: './rgpd.html',
  styleUrls: ['./rgpd.scss'],
  standalone: true,
  imports: [FooterComponent],
})
export class RGPDComponent {
  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['/']);
  }
}
