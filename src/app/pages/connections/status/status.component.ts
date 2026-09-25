import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ConnectionsService } from '../../../services/connections.service';

@Component({
  selector: 'app-status',
  imports: [NgClass],
  templateUrl: './status.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './status.component.scss',
})
export class StatusComponent {
  private readonly authService = inject(AuthService);
  private readonly connectionsService = inject(ConnectionsService);

  private readonly $user = this.authService.$user;
  private readonly $riotUser = this.connectionsService.$riotUser;

  public readonly $statusList = computed(() => [
    { active: !!this.$user()?.twitchAccessToken, name: 'Twitch' },
    { active: !!this.$user()?.kickAccessToken, name: 'Kick' },
    { active: !!this.$user()?.isSpotifyConnected, name: 'Spotify' },
    { active: !!this.$user()?.isStreamElementsConnected, name: 'Stream Elements' },
    { active: !!this.$riotUser()?.riotAccountList?.length, name: 'Riot Games' },
  ]);
}
