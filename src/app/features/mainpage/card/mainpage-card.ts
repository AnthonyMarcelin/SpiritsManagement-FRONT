import { Component, Input } from '@angular/core';

type AlcoholRoute = 'whisky' | 'biere' | 'rhum';

@Component({
  selector: 'app-mainpage-card',
  standalone: true,
  imports: [],
  templateUrl: './mainpage-card.html',
  styleUrls: ['./mainpage-card.scss'],
})
export class MainpageCardComponent {
  @Input() label!: string;
  @Input() img!: string;
  @Input() route!: AlcoholRoute;
  @Input() goTo!: (route: AlcoholRoute) => void;

  onClick() {
    if (this.goTo) {
      this.goTo(this.route);
    }
  }
}
