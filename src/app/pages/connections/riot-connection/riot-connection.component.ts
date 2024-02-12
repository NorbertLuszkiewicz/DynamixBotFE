import { Component, Signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ServerName } from '../../../models/enums';
import { RiotAccount } from '../../../models/interfaces';
import { ConnectionsService } from '../../../services/connections.service';
import { InfoBoxComponent } from '../../../shered/info-box/info-box.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCommonModule } from '@angular/material/core';

@Component({
  selector: 'app-riot-connection',
  standalone: true,
  imports: [
    CommonModule,
    InfoBoxComponent,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
    MatCommonModule,
  ],
  templateUrl: './riot-connection.component.html',
  styleUrl: './riot-connection.component.scss',
})
export class RiotConnectionComponent {
  private readonly $riotUser = this.connectionsService.$riotUser;
  public readonly servers: ServerName[] = Object.values(ServerName);
  public readonly $riotAccounts: Signal<RiotAccount[]> = computed(() => this.$riotUser()?.riotAccountList || []);
  public riotAccountData: RiotAccount = {
    name: '',
    server: ServerName.EUW,
  };

  constructor(private connectionsService: ConnectionsService) {}

  createRiotAccount(): void {
    const name = localStorage.getItem('name');

    this.connectionsService.addRiotAccount(this.riotAccountData.name, this.riotAccountData.server, name).subscribe();
  }

  deleteRiotAccount(account: RiotAccount): void {
    const name = localStorage.getItem('name');

    this.connectionsService.removeRiotAccount(account.name, account.server, name).subscribe();
  }

  userServerName(name: ServerName): string {
    const server = Object.assign({}, ...Object.entries(ServerName as {}).map(([a, b]) => ({ [b.toString()]: a })));

    return server[name];
  }
}
