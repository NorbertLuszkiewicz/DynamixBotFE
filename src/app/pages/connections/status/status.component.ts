import { CommonModule } from '@angular/common';
import { Component, computed } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ConnectionsService } from '../../../services/connections.service';

@Component({
  selector: 'app-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './status.component.html',
  styleUrl: './status.component.scss',
})
export class StatusComponent {
  private readonly $user = this.authService.$user;
  private readonly $riotUser = this.connectionsService.$riotUser;
  public $statusList = computed(() => {
    return [
      { active: !!this.$user()?.twitchAccessToken, name: 'Twitch' },
      { active: !!this.$user()?.kickAccessToken, name: 'Kick' },
      { active: !!this.$user()?.isSpotifyConnected, name: 'Spotify' },
      { active: !!this.$user()?.isStreamElementsConnected, name: 'Stream Elements' },
      { active: !!this.$riotUser()?.riotAccountList?.length, name: 'Riot Games' },
    ];
  });

  constructor(private authService: AuthService, private connectionsService: ConnectionsService) {}
}
