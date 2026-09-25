import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { StreamElementsForm } from '../../../models/interfaces';
import { ConnectionsService } from '../../../services/connections.service';
import { StorageService } from '../../../core/services/storage.service';
import { InfoBoxComponent } from '../../../shared/info-box/info-box.component';

@Component({
  selector: 'app-stream-elements-connection',
  imports: [FormsModule, InfoBoxComponent, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './stream-elements-connection.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './stream-elements-connection.component.scss',
})
export class StreamElementsConnectionComponent {
  private readonly connectionsService = inject(ConnectionsService);
  private readonly storage = inject(StorageService);

  public streamElementsData: StreamElementsForm = {
    accountId: '',
    jwtToken: '',
  };

  public createStreamElements(): void {
    this.connectionsService
      .connectStreamElements(this.streamElementsData.accountId, this.streamElementsData.jwtToken, this.storage.userName)
      .subscribe();
  }
}
