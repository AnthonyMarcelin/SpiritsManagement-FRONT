import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { AuthService } from '../../core/services/auth';

export const authGuard: CanActivateFn = (_state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return auth.getMe().pipe(
    map(() => true),
    catchError(() => {
      router.navigate(['/login']);
      return of(false);
    }),
  );
};

export const adminGuard: CanActivateFn = (_state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return auth.getMe().pipe(
    map((user: any) => {
      if (user.isAdmin) {
        return true;
      } else {
        router.navigate(['/']);
        return false;
      }
    }),
    catchError(() => {
      router.navigate(['/login']);
      return of(false);
    }),
  );
};
