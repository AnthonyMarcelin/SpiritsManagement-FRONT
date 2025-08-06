import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  styleUrls: ['./footer.scss'],
  standalone: true,
  host: {
    class: 'app-footer-wrapper',
  },
})
export class FooterComponent {}
