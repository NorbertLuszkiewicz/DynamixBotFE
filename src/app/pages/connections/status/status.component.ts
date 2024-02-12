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
      { active: true, name: 'Twitch' },
      { active: !!this.$user()?.isSpotifyConnected || false, name: 'Spotify' },
      { active: !!this.$user()?.isStreamElementsConnected || false, name: 'Stream Elements' },
      { active: this.$riotUser()?.riotAccountList?.length > 0 || false, name: 'Riot Games' },
    ];
  });

  constructor(private authService: AuthService, private connectionsService: ConnectionsService) {}
}
