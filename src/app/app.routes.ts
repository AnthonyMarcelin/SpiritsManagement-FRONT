import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { Adminpage } from './features/adminpage/adminpage';
import { EmailVerifiedPage } from './features/auth/email-verified/email-verified';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { AddBottle } from './features/collection/add-bottle/add-bottle';
import { Collection } from './features/collection/collection';
import { Homepage } from './features/homepage/homepage';
import { Mainpage } from './features/mainpage/mainpage';
import { NotFound } from './features/not-found/not-found';
import { Profilepage } from './features/profilepage/profilepage';

export const routes: Routes = [
  { path: '', component: Homepage },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'profile', component: Profilepage, canActivate: [authGuard] },
  { path: 'admin', component: Adminpage, canActivate: [authGuard] },
  { path: 'mainpage', component: Mainpage, canActivate: [authGuard] },
  {
    path: 'collection/:alcool',
    component: Collection,
    canActivate: [authGuard],
  },
  {
    path: ':alcool/add_bottle',
    component: AddBottle,
    canActivate: [authGuard],
  },
  {
    path: 'email-verified',
    loadComponent: () =>
      import('./features/auth/email-verified/email-verified').then(
        (m) => EmailVerifiedPage,
      ),
  },
  { path: '**', component: NotFound },
];
