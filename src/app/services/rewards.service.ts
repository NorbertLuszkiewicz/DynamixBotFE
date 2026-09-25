import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { MessageResponse } from '../models/interfaces';
import { CommandSwitch } from '../models/user-interfaces';
import { AuthService } from './auth.service';
import { ConnectionsService } from './connections.service';

@Injectable({
  providedIn: 'root',
})
export class RewardsService {
  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthService);
  private readonly connectionsService = inject(ConnectionsService);

  public addChangeVolumeAward(
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
          this.authService.setSuccessMessage(data.message ?? 'Volume award changed');
        })
      );
  }

  public setSongQueue(
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
          this.authService.setSuccessMessage(data.message ?? 'Song queue data changed');
        })
      );
  }

  public addSlotsAward(
    name: string,
    emotes: number,
    withBan: boolean,
    streamerName: string
  ): Observable<MessageResponse> {
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
          this.authService.setSuccessMessage(data.message ?? 'Added slot');
        })
      );
  }

  public changeCommandSwitch(body: CommandSwitch, streamerName: string): Observable<MessageResponse> {
    return this.http.put<MessageResponse>(`${environment.url}command_switch`, {
      body,
      user: streamerName,
    });
  }

  public removeSlot(id: string, streamerName: string): Observable<MessageResponse> {
    return this.http
      .put<MessageResponse>(`${environment.url}slot_remove`, {
        id,
        user: streamerName,
      })
      .pipe(
        tap((data) => {
          this.connectionsService.getCommands();
          this.authService.setSuccessMessage(data.message ?? 'Removed slot');
        })
      );
  }
}
