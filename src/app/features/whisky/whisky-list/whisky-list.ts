import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { WhiskyService } from '../../../core/services/collection/whisky.service';
import { Whisky } from '../../../models/whisky.interface';

@Component({
  selector: 'app-whisky-list',
  imports: [CommonModule, MatButtonModule, MatCardModule],
  templateUrl: './whisky-list.html',
  styleUrl: './whisky-list.scss',
})
export class WhiskyList implements OnInit {
  whiskies: Whisky[] = [];
  loading = false;
  error: string | null = null;

  constructor(private whiskyService: WhiskyService) {}

  ngOnInit() {
    this.loadWhiskies();
  }

  loadWhiskies() {
    this.loading = true;
    this.error = null;

    this.whiskyService.getAllWhisky().subscribe({
      next: (data) => {
        this.whiskies = data;
        this.loading = false;
        console.log('Whiskies recuperes: ', data);
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des whiskies';
        this.loading = false;
        console.error('API error', err);
      },
    });
  }
}
