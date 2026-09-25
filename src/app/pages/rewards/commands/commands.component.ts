import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CommandSwitch } from '../../../models/user-interfaces';
import { ConnectionsService } from '../../../services/connections.service';
import { RewardsService } from '../../../services/rewards.service';

@Component({
  selector: 'app-commands',
  imports: [MatSlideToggleModule, FormsModule],
  templateUrl: './commands.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './commands.component.scss',
})
export class CommandsComponent {
  private readonly connectionsService = inject(ConnectionsService);
  private readonly rewardsService = inject(RewardsService);
  private readonly $userCommands = this.connectionsService.$userCommands;

  public commands: CommandSwitch = {
    weather: true,
    tft: true,
    chess: true,
    wordle: true,
    slots: true,
    song: true,
  };

  private streamerName = '';

  constructor() {
    effect(() => {
      const userCommands = this.$userCommands();

      if (userCommands?.commandSwitch) {
        this.commands = userCommands.commandSwitch;
        this.streamerName = userCommands.streamer ?? '';
      }
    });
  }

  public changeCommand(): void {
    this.rewardsService.changeCommandSwitch(this.commands, this.streamerName).subscribe();
  }
}
