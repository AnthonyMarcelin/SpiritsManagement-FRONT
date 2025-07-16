import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { Homepage } from './features/homepage/homepage';
import { Mainpage } from './features/mainpage/mainpage';
import { NotFound } from './features/not-found/not-found';
import { WhiskyList } from './features/whisky/whisky-list/whisky-list';

export const routes: Routes = [
  { path: '', component: Homepage }, // default
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'mainpage', component: Mainpage },
  { path: 'whisky', component: WhiskyList, canActivate: [authGuard] }, // Page des whiskies
  { path: '**', component: NotFound }, // Toutes les autres (404)
];
