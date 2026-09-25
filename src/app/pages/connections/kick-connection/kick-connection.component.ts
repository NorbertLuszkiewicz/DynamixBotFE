import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ConnectionsService } from '../../../services/connections.service';
import { StorageService } from '../../../core/services/storage.service';
import { InfoBoxComponent } from '../../../shared/info-box/info-box.component';

@Component({
  selector: 'app-kick-connection',
  imports: [InfoBoxComponent, MatButtonModule],
  templateUrl: './kick-connection.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './kick-connection.component.scss',
})
export class KickConnectionComponent {
  private readonly connectionsService = inject(ConnectionsService);
  private readonly storage = inject(StorageService);

  public connectKick(): void {
    if (this.storage.userName) {
      this.connectionsService.connectKick(this.storage.userName);
    }
  }
}
