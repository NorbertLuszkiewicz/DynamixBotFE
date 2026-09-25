import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { MessageResponse } from '../models/interfaces';
import { Commands, RiotUser, SongData } from '../models/user-interfaces';
import { StorageService } from '../core/services/storage.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ConnectionsService {
  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthService);
  private readonly storage = inject(StorageService);

  private readonly userCommandsSignal = signal<Commands | null>(null);
  private readonly riotUserSignal = signal<RiotUser | null>(null);
  private readonly songsUserSignal = signal<SongData | null>(null);

  public readonly $userCommands = this.userCommandsSignal.asReadonly();
  public readonly $riotUser = this.riotUserSignal.asReadonly();
  public readonly $songsUser = this.songsUserSignal.asReadonly();

  public getSongsUser(): void {
    this.fetchUserData<SongData>('song', this.songsUserSignal);
  }

  public getRiotUser(): void {
    this.fetchUserData<RiotUser>('riot', this.riotUserSignal);
  }

  public getCommands(): void {
    this.fetchUserData<Commands>('commands', this.userCommandsSignal);
  }

  public connectStreamElements(clientId: string, token: string, streamerName: string): Observable<MessageResponse> {
    return this.http
      .put<MessageResponse>(`${environment.url}streamelements`, {
        clientID: clientId,
        token,
        user: streamerName,
      })
      .pipe(
        tap((data) => {
          this.authService.getNewUser();
          this.getSongsUser();
          this.authService.setSuccessMessage(data.message ?? 'Connected Stream Elements');
        })
      );
  }

  public addRiotAccount(name: string, server: string, streamerName: string): Observable<MessageResponse> {
    return this.http
      .put<MessageResponse>(`${environment.url}riot`, {
        name,
        server,
        user: streamerName,
      })
      .pipe(
        tap((data) => {
          this.getRiotUser();
          this.authService.setSuccessMessage(data.message ?? 'Added riot account');
        })
      );
  }

  public removeRiotAccount(name: string, server: string, streamerName: string): Observable<MessageResponse> {
    return this.http
      .put<MessageResponse>(`${environment.url}riot-remove`, {
        name,
        server,
        user: streamerName,
      })
      .pipe(
        tap((data) => {
          this.getRiotUser();
          this.authService.setSuccessMessage(data.message ?? 'Removed riot account');
        })
      );
  }

  public connectSpotify(streamerName: string): void {
    window.location.href = `${environment.url}spotify?user=${streamerName}`;
  }

  public connectKick(streamerName: string): void {
    this.createCodeChallenge('code_verifier').then((challenge) => {
      const status = `${environment.production ? '' : 'local'}${streamerName.toLowerCase()}`;
      const params = [
        'response_type=code',
        'client_id=01K0VRXPBR7SFN7GR0ZYQMX709',
        'scope=user:read channel:read channel:write chat:write events:subscribe moderation:ban',
        'code_challenge_method=S256',
        `code_challenge=${challenge}`,
        `state=${status.toLowerCase()}`,
        `redirect_uri=${environment.url}kickRedirect`,
      ];

      window.location.href = `https://id.kick.com/oauth/authorize?${params.join('&')}`;
    });
  }

  private fetchUserData<T>(endpoint: string, target: ReturnType<typeof signal<T | null>>): void {
    const { name, token } = this.storage.getUserNameAndToken();

    if (!name || !token) {
      return;
    }

    this.http.get<T>(`${environment.url}${endpoint}?name=${name}&token=${token}`).subscribe({
      next: (data) => target.set(data),
      error: (err) => console.error(`get ${endpoint}`, err),
    });
  }

  private async createCodeChallenge(verifier: string): Promise<string> {
    const data = new TextEncoder().encode(verifier);
    const digest = await crypto.subtle.digest('SHA-256', data);

    return btoa(String.fromCharCode(...new Uint8Array(digest)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }
}
