import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { ConnectionsService } from '../../../services/connections.service';
import { RewardsService } from '../../../services/rewards.service';
import { StorageService } from '../../../core/services/storage.service';
import { InfoBoxComponent } from '../../../shared/info-box/info-box.component';

interface VolumeForm {
  min: number;
  minSR: number;
  max: number;
  maxSR: number;
  time: number;
}

const DEFAULT_VOLUME_DATA: VolumeForm = {
  min: 50,
  minSR: 50,
  max: 100,
  maxSR: 100,
  time: 60,
};

@Component({
  selector: 'app-song-volume',
  imports: [InfoBoxComponent, MatSliderModule, FormsModule, MatButtonModule],
  templateUrl: './song-volume.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './song-volume.component.scss',
})
export class SongVolumeComponent {
  private readonly connectionsService = inject(ConnectionsService);
  private readonly rewardsService = inject(RewardsService);
  private readonly storage = inject(StorageService);

  private readonly $songsUser = this.connectionsService.$songsUser;

  public data: VolumeForm = { ...DEFAULT_VOLUME_DATA };

  constructor() {
    effect(() => {
      const volumeChanger = this.$songsUser()?.volumeChanger;

      if (!volumeChanger) {
        return;
      }

      this.data = {
        min: volumeChanger.min ?? DEFAULT_VOLUME_DATA.min,
        minSR: volumeChanger.minSR ?? DEFAULT_VOLUME_DATA.minSR,
        max: volumeChanger.max ?? DEFAULT_VOLUME_DATA.max,
        maxSR: volumeChanger.maxSR ?? DEFAULT_VOLUME_DATA.maxSR,
        time: (volumeChanger.time ?? DEFAULT_VOLUME_DATA.time * 1000) / 1000,
      };
    });
  }

  public onSubmit(): void {
    const { min, minSR, max, maxSR, time } = this.data;

    this.rewardsService.addChangeVolumeAward(min, max, minSR, maxSR, time * 1000, this.storage.userName).subscribe();
  }
}
