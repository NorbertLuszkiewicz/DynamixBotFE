import { Component, effect, ChangeDetectionStrategy } from '@angular/core';
import { commandSwitch } from '../../../models/user-interfaces';
import { RewardsService } from '../../../services/rewards.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { FormsModule } from '@angular/forms';
import { ConnectionsService } from '../../../services/connections.service';

@Component({
  selector: 'app-commands',
  imports: [MatSlideToggleModule, FormsModule],
  templateUrl: './commands.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './commands.component.scss',
})
export class CommandsComponent {
  private readonly $userCommands = this.connectionsService.$userCommands;
  public commands: commandSwitch = {
    weather: true,
    tft: true,
    chess: true,
    wordle: true,
    slots: true,
    song: true,
  };
  streamerName: string;

  constructor(private connectionsService: ConnectionsService, private rewardsService: RewardsService) {
    effect(() => {
      this.initCommands();
    });
  }

  public changeCommand(): void {
    setTimeout(() => {
      this.rewardsService.changeCommandSwitch(this.commands, this.streamerName).subscribe();
    });
  }

  public ngOnInit(): void {
    this.initCommands();
  }

  private initCommands(): void {
    if (this.$userCommands()?.commandSwitch) {
      this.commands = this.$userCommands().commandSwitch;
      this.streamerName = this.$userCommands().streamer;
    }
  }
}
