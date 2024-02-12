import { Injectable, ErrorHandler } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ErrorHandlerService implements ErrorHandler {
  constructor(private authService: AuthService) {}

  handleError(error: any) {
    if (error instanceof HttpErrorResponse) {
      //Backend returns unsuccessful response codes such as 404, 500 etc.
      if (error.status === 401 || error.status === 403) {
        console.log(error, 'xxxxx');
        this.authService.logout();
      }

      const errorMessage = error.message.includes('Http failure response for')
        ? 'Coś poszło nie tak. Sproboj ponownie później.'
        : error.message;

      this.authService.errorMessage.set(errorMessage);
    }
  }
}
