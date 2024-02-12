import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ConnectionsService } from '../../../services/connections.service';
import { InfoBoxComponent } from '../../../shered/info-box/info-box.component';

@Component({
  selector: 'app-spotify-connection',
  standalone: true,
  imports: [InfoBoxComponent, MatButtonModule],
  templateUrl: './spotify-connection.component.html',
  styleUrl: './spotify-connection.component.scss',
})
export class SpotifyConnectionComponent {
  constructor(private connectionsService: ConnectionsService) {}

  public connectSpotify(): void {
    const name = localStorage.getItem('name');
    if (name) this.connectionsService.connectSpotify(name);
  }
}
