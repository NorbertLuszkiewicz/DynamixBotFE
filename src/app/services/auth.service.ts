import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { User } from '../models/user-interfaces';
import { StorageService } from '../core/services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly storage = inject(StorageService);

  private readonly userSignal = signal<User | null>(null);
  private readonly errorMessageSignal = signal<string | null>(null);
  private readonly successMessageSignal = signal<string | null>(null);

  public readonly $user = this.userSignal.asReadonly();
  public readonly errorMessage = this.errorMessageSignal.asReadonly();
  public readonly successMessage = this.successMessageSignal.asReadonly();

  public setUserNameAndToken(name: string, token: string): void {
    this.storage.setUserNameAndToken(name, token);
    this.getNewUser();
  }

  public getNewUser(): void {
    const { name, token } = this.storage.getUserNameAndToken();

    if (!name || !token) {
      return;
    }

    this.http.get<User>(`${environment.url}account?name=${name}&token=${token}`).subscribe({
      next: (user) => this.userSignal.set(user),
      error: (err) => console.error('getNewUser', err),
    });
  }

  public setErrorMessage(message: string | null): void {
    this.errorMessageSignal.set(message);
  }

  public setSuccessMessage(message: string | null): void {
    this.successMessageSignal.set(message);
  }

  public logout(): void {
    this.storage.clear();
    this.userSignal.set(null);
    this.router.navigate(['/information']);
  }
}
