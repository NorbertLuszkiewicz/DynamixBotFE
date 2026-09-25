import { Component, computed, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { InfoBoxComponent } from '../../../shered/info-box/info-box.component';
import { RewardsService } from '../../../services/rewards.service';
import { ConnectionsService } from '../../../services/connections.service';

@Component({
  selector: 'app-song-queue',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatSlideToggleModule, MatButtonModule, InfoBoxComponent],
  templateUrl: './song-queue.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './song-queue.component.scss',
})
export class SongQueueComponent {
  private readonly $songUser = this.connectionsService.$songsUser;
  private readonly defaultQueueData = {
    isActive: false,
    size: 0,
    pauseAfterRequest: false,
  };
  public $queueData = computed(() => this.$songUser().skipSongs || this.defaultQueueData);

  constructor(private rewardsService: RewardsService, private connectionsService: ConnectionsService) {}

  public setSongQueue(): void {
    const name = localStorage.getItem('name');
    this.rewardsService
      .setSongQueue(this.$queueData().isActive, this.$queueData().size, this.$queueData().pauseAfterRequest, name)
      .subscribe();
  }
}
