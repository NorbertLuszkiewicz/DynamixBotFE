import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

const UNAUTHORIZED_STATUSES = [401, 403];

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (UNAUTHORIZED_STATUSES.includes(error.status)) {
        authService.logout();
      } else if (error.status >= 400) {
        authService.setErrorMessage(
          error.message?.includes('Http failure response')
            ? 'Coś poszło nie tak. Spróbuj ponownie później.'
            : error.message
        );
      }

      return throwError(() => error);
    })
  );
};
