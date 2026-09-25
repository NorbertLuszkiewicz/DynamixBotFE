import { ChangeDetectionStrategy, Component, Signal, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ServerName } from '../../../models/enums';
import { RiotAccount } from '../../../models/interfaces';
import { ConnectionsService } from '../../../services/connections.service';
import { StorageService } from '../../../core/services/storage.service';
import { InfoBoxComponent } from '../../../shared/info-box/info-box.component';

const SERVER_LABELS: Record<string, string> = Object.entries(ServerName).reduce(
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

@Component({
  selector: 'app-riot-connection',
  imports: [
    InfoBoxComponent,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
  ],
  templateUrl: './riot-connection.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './riot-connection.component.scss',
})
export class RiotConnectionComponent {
  private readonly connectionsService = inject(ConnectionsService);
  private readonly storage = inject(StorageService);

  private readonly $riotUser = this.connectionsService.$riotUser;

  public readonly servers: ServerName[] = Object.values(ServerName);
  public readonly $riotAccounts: Signal<RiotAccount[]> = computed(() => this.$riotUser()?.riotAccountList ?? []);

  public riotAccountData: RiotAccount = {
    name: '',
    server: ServerName.EUW,
  };

  public createRiotAccount(): void {
    this.connectionsService
      .addRiotAccount(this.riotAccountData.name, this.riotAccountData.server, this.storage.userName)
      .subscribe();
  }

  public deleteRiotAccount(account: RiotAccount): void {
    this.connectionsService.removeRiotAccount(account.name, account.server, this.storage.userName).subscribe();
  }

  public userServerName(server: ServerName): string {
    return SERVER_LABELS[server];
  }
}
