import { Routes } from '@angular/router';
import { Homepage } from './features/homepage/homepage';
import { WhiskyList } from './features/whisky/whisky-list/whisky-list';

export const routes: Routes = [
  { path: '', component: Homepage }, // default
  { path: 'whisky', component: WhiskyList }, // Page des whiskies
  { path: '**', redirectTo: '/whisky' }, // Toutes les autres (404)
];
