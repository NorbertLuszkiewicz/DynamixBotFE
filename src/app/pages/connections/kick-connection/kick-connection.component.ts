import { Component } from '@angular/core';
import { ConnectionsService } from '../../../services/connections.service';
import { MatButtonModule } from '@angular/material/button';
import { InfoBoxComponent } from '../../../shered/info-box/info-box.component';

@Component({
  selector: 'app-kick-connection',
  standalone: true,
  imports: [InfoBoxComponent, MatButtonModule],
  templateUrl: './kick-connection.component.html',
  styleUrl: './kick-connection.component.scss',
})
export class KickConnectionComponent {
  constructor(private connectionsService: ConnectionsService) {}

  public connectKick(): void {
    const name = localStorage.getItem('name');
    if (name) this.connectionsService.connectKick(name);
  }
}
