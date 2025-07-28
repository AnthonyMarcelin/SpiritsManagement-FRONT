import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../shared/components/footer/footer';

@Component({
  selector: 'app-homepage',
  imports: [RouterModule, FooterComponent],
  templateUrl: './homepage.html',
  styleUrl: './homepage.scss',
})
export class Homepage {}
