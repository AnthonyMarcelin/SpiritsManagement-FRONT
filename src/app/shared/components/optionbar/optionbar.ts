import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-optionbar',
  imports: [],
  templateUrl: './optionbar.html',
  styleUrl: './optionbar.scss',
})
export class Optionbar {
  @Input() alcool: string = '';
  constructor(private router: Router) {}

  goToAddBottle() {
    if (this.alcool) {
      this.router.navigate(['/' + this.alcool + '/add_bottle']);
    } else {
      this.router.navigate(['/add_bottle']);
    }
  }
}
