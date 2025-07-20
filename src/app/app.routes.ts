import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { Adminpage } from './features/adminpage/adminpage';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { Homepage } from './features/homepage/homepage';
import { Mainpage } from './features/mainpage/mainpage';
import { NotFound } from './features/not-found/not-found';
import { Profilepage } from './features/profilepage/profilepage';
import { WhiskyList } from './features/whisky/whisky-list/whisky-list';

export const routes: Routes = [
  { path: '', component: Homepage },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'profile', component: Profilepage, canActivate: [authGuard] },
  { path: 'admin', component: Adminpage, canActivate: [authGuard] },
  { path: 'mainpage', component: Mainpage, canActivate: [authGuard] },
  { path: 'whisky', component: WhiskyList, canActivate: [authGuard] },
  { path: '**', component: NotFound },
];
