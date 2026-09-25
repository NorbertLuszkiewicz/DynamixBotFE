import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ConnectionsService } from '../../../services/connections.service';
import { StorageService } from '../../../core/services/storage.service';
import { InfoBoxComponent } from '../../../shared/info-box/info-box.component';

@Component({
  selector: 'app-spotify-connection',
  imports: [InfoBoxComponent, MatButtonModule],
  templateUrl: './spotify-connection.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './spotify-connection.component.scss',
})
export class SpotifyConnectionComponent {
  private readonly connectionsService = inject(ConnectionsService);
  private readonly storage = inject(StorageService);

  public connectSpotify(): void {
    if (this.storage.userName) {
      this.connectionsService.connectSpotify(this.storage.userName);
    }
  }
}
