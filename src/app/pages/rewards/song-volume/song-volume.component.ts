import { CommonModule } from '@angular/common';
import { Component, effect, Signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { RewardsService } from '../../../services/rewards.service';
import { InfoBoxComponent } from '../../../shered/info-box/info-box.component';
import { ConnectionsService } from '../../../services/connections.service';
import { MatCommonModule } from '@angular/material/core';
import { VolumeSong } from '../../../models/interfaces';

@Component({
  selector: 'app-song-volume',
  standalone: true,
  imports: [InfoBoxComponent, MatSliderModule, FormsModule, CommonModule, MatButtonModule, MatCommonModule],
  templateUrl: './song-volume.component.html',
  styleUrl: './song-volume.component.scss',
})
export class SongVolumeComponent {
  private readonly $songsUser = this.connectionsService.$songsUser;
  private initialData: VolumeSong = {
    min: 50,
    minSR: 50,
    max: 100,
    maxSR: 100,
    time: 60,
  };
  public readonly $data: Signal<VolumeSong> = computed(() => {
    const newData = this.$songsUser().volumeSongID;
    return newData ? { ...newData, time: newData.time / 1000 } : this.initialData;
  });

  constructor(private connectionsService: ConnectionsService, private rewardsService: RewardsService) {}

  public onSubmit(): void {
    const name = localStorage.getItem('name');
    const { min, minSR, max, maxSR, time } = this.$data();
    this.rewardsService.addChangeVolumeAward(min, max, minSR, maxSR, time * 1000, name).subscribe();
  }
}
