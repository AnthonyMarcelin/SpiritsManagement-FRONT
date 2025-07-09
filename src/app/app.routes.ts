import { Routes } from '@angular/router';
import { WhiskyList } from './features/whisky/whisky-list/whisky-list';

export const routes: Routes = [
  { path: '', redirectTo: '/whisky', pathMatch: 'full' }, // default
  { path: 'whisky', component: WhiskyList }, // Page des whiskies
  { path: '**', redirectTo: '/whisky' }, // Toutes les autres (404)
];
