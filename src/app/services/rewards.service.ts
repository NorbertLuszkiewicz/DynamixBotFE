import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { commandSwitch } from '../models/user-interfaces';
import { environment } from '../../environments/environment';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import { MessageResponse } from '../models/interfaces';
import { AuthService } from './auth.service';
import { ConnectionsService } from './connections.service';

@Injectable({
  providedIn: 'root',
})
export class RewardsService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private connectionsService: ConnectionsService
  ) {}

  addChangeVolumeAward(
    min: number,
    max: number,
    minSR: number,
    maxSR: number,
    time: number,
    streamerName: string
  ): Observable<MessageResponse> {
    return this.http
      .put<MessageResponse>(`${environment.url}volumeaward`, {
        min,
        max,
        minSR,
        maxSR,
        time,
        user: streamerName,
      })
      .pipe(
        tap((data) => {
          this.connectionsService.getSongsUser();
          this.authService.successMessage.set(data.message || 'Volume award changed');
        })
      );
  }

  setSongQueue(
    isActive: boolean,
    size: number,
    pauseAfterRequest: boolean,
    streamerName: string
  ): Observable<MessageResponse> {
    return this.http
      .put<MessageResponse>(`${environment.url}songqueue`, {
        isActive,
        size,
        pauseAfterRequest,
        user: streamerName,
      })
      .pipe(
        tap((data) => {
          this.connectionsService.getSongsUser();
          this.authService.successMessage.set(data.message || 'Song queue data changed');
        })
      );
  }

  addSlotsAward(name: string, emotes: number, withBan: boolean, streamerName: string): Observable<MessageResponse> {
    return this.http
      .put<MessageResponse>(`${environment.url}slots`, {
        name,
        emotes,
        withBan,
        user: streamerName,
      })
      .pipe(
        tap((data) => {
          this.connectionsService.getCommands();
          this.authService.successMessage.set(data.message || 'Added slot');
        })
      );
  }

  changeCommandSwitch(body: commandSwitch, streamerName: string): Observable<MessageResponse> {
    return this.http
      .put<MessageResponse>(`${environment.url}command_switch`, {
        body,
        user: streamerName,
      })
      .pipe(distinctUntilChanged());
  }

  removeSlot(id: string, streamerName: string): Observable<MessageResponse> {
    return this.http
      .put<MessageResponse>(`${environment.url}slot_remove`, {
        id,
        user: streamerName,
      })
      .pipe(
        tap((data) => {
          this.connectionsService.getCommands();
          this.authService.successMessage.set(data.message || 'Removed slot');
        })
      );
  }
}
