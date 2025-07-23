import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-optionbar',
  imports: [],
  templateUrl: './optionbar.html',
  styleUrl: './optionbar.scss',
})
export class Optionbar {
  constructor(private router: Router) {}

  goToAddBottle() {
    this.router.navigate(['/add_bottle']);
  }
}
