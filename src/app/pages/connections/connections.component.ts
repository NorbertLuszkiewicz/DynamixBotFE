import { Component } from '@angular/core';
import { GridWrapperComponent } from '../../shered/grid-wrapper/grid-wrapper.component';
import { RiotConnectionComponent } from './riot-connection/riot-connection.component';
import { SpotifyConnectionComponent } from './spotify-connection/spotify-connection.component';
import { StatusComponent } from './status/status.component';
import { StreamElementsConnectionComponent } from './stream-elements-connection/stream-elements-connection.component';

@Component({
  selector: 'app-connections',
  standalone: true,
  imports: [
    RiotConnectionComponent,
    SpotifyConnectionComponent,
    StatusComponent,
    StreamElementsConnectionComponent,
    GridWrapperComponent,
  ],
  templateUrl: './connections.component.html',
  styleUrl: './connections.component.scss',
})
export class ConnectionsComponent {}
