import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SongSkipQueue } from '../../../models/user-interfaces';
import { ConnectionsService } from '../../../services/connections.service';
import { RewardsService } from '../../../services/rewards.service';
import { StorageService } from '../../../core/services/storage.service';
import { InfoBoxComponent } from '../../../shared/info-box/info-box.component';

const DEFAULT_QUEUE_DATA: SongSkipQueue = {
  isActive: false,
  size: 0,
  pauseAfterRequest: false,
};

@Component({
  selector: 'app-song-queue',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatSlideToggleModule, MatButtonModule, InfoBoxComponent],
  templateUrl: './song-queue.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './song-queue.component.scss',
})
export class SongQueueComponent {
  private readonly connectionsService = inject(ConnectionsService);
  private readonly rewardsService = inject(RewardsService);
  private readonly storage = inject(StorageService);

  private readonly $songUser = this.connectionsService.$songsUser;

  public queueData: SongSkipQueue = { ...DEFAULT_QUEUE_DATA };

  constructor() {
    effect(() => {
      const skipSongs = this.$songUser()?.skipSongs;

      if (skipSongs) {
        this.queueData = { ...skipSongs };
      }
    });
  }

  public setSongQueue(): void {
    const { isActive, size, pauseAfterRequest } = this.queueData;

    this.rewardsService.setSongQueue(isActive, size, pauseAfterRequest, this.storage.userName).subscribe();
  }
}
