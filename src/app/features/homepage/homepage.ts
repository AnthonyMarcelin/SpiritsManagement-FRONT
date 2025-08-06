import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../shared/components/footer/footer';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [RouterModule, CommonModule, FooterComponent],
  templateUrl: './homepage.html',
  styleUrl: './homepage.scss',
})
export class Homepage {}
