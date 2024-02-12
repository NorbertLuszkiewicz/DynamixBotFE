import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((err) => {
      const authService = inject(AuthService);
      console.log(err.status, 'xddd');
      if (err.status === 401 || err.status === 403) {
        authService.logout();
      }
      return throwError(() => err);
    })
  );
};
