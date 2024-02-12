import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from '../models/user-interfaces';
import { Router } from '@angular/router';
import { ConnectionsService } from './connections.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private $userSingal = signal<User | null>(null);
  public errorMessage = signal<string | null>('');
  public successMessage = signal<string | null>('');
  public $user = this.$userSingal.asReadonly();

  constructor(private http: HttpClient, private router: Router) {}

  public setUserNameAndToken(name: string, token: string): void {
    localStorage.setItem('name', name);
    localStorage.setItem('token', token);
    this.getNewUser();
  }

  public getNewUser(): void {
    const name = localStorage.getItem('name');
    const token = localStorage.getItem('token');

    this.http.get<User>(`${environment.url}account?name=${name}&token=${token}`).subscribe({
      next: (user) => this.$userSingal.set(user),
      error: (err) => console.log('auth ', err),
    });
  }

  public logout(): void {
    localStorage.removeItem('name');
    localStorage.removeItem('token');
    this.$userSingal.set(null);
    this.router.navigate(['/information']);
  }
}
