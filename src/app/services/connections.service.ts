import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';
import { MessageResponse } from '../models/interfaces';
import { AuthService } from './auth.service';
import { Commands, RiotUser, SongData } from '../models/user-interfaces';

@Injectable({
  providedIn: 'root',
})
export class ConnectionsService {
  constructor(private http: HttpClient, private authService: AuthService) {}
  private $userCommandsSignal = signal<Commands | null>(null);
  private $riotUserSignal = signal<RiotUser | null>(null);
  private $songsUserSignal = signal<SongData | null>(null);
  public $userCommands = this.$userCommandsSignal.asReadonly();
  public $riotUser = this.$riotUserSignal.asReadonly();
  public $songsUser = this.$songsUserSignal.asReadonly();

  getSongsUser(): void {
    const name = localStorage.getItem('name');
    const token = localStorage.getItem('token');

    this.http.get<RiotUser>(`${environment.url}song?name=${name}&token=${token}`).subscribe({
      next: (songs) => this.$songsUserSignal.set(songs),
      error: (err) => console.log('getSongsUser ', err),
    });
  }

  getRiotUser(): void {
    const name = localStorage.getItem('name');
    const token = localStorage.getItem('token');

    this.http.get<RiotUser>(`${environment.url}riot?name=${name}&token=${token}`).subscribe({
      next: (riot) => this.$riotUserSignal.set(riot),
      error: (err) => console.log('getRiotUser ', err),
    });
  }

  getCommands(): void {
    const name = localStorage.getItem('name');
    const token = localStorage.getItem('token');

    this.http.get<Commands>(`${environment.url}commands?name=${name}&token=${token}`).subscribe({
      next: (commands) => this.$userCommandsSignal.set(commands),
      error: (err) => console.log('getCommands ', err),
    });
  }
  connectStreamElements(clientID: string, token: string, streamerName: string): Observable<MessageResponse> {
    return this.http
      .put<MessageResponse>(`${environment.url}streamelements`, {
        clientID,
        token,
        user: streamerName,
      })
      .pipe(
        tap((data) => {
          this.authService.getNewUser();
          this.getSongsUser();
          this.authService.successMessage.set(data.message || 'Added slot');
        })
      );
  }

  addRiotAccount(name: string, server: string, streamerName: string): Observable<MessageResponse> {
    return this.http
      .put<MessageResponse>(`${environment.url}riot`, {
        name,
        server,
        user: streamerName,
      })
      .pipe(
        tap((data) => {
          this.getRiotUser();
          this.authService.successMessage.set(data.message || 'Added riot account');
        })
      );
  }

  removeRiotAccount(name: string, server: string, streamerName: string): Observable<MessageResponse> {
    return this.http
      .put<MessageResponse>(`${environment.url}riot-remove`, {
        name,
        server,
        user: streamerName,
      })
      .pipe(
        tap((data) => {
          this.getRiotUser();
          this.authService.successMessage.set(data.message || 'Removed riot account');
        })
      );
  }

  connectSpotify(streamerName: string): void {
    window.location.href = `${environment.url}spotify?user=${streamerName}`;
  }
}
