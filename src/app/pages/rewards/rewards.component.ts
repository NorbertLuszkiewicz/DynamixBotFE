import { Component, ChangeDetectionStrategy } from '@angular/core';
import { GridWrapperComponent } from '../../shered/grid-wrapper/grid-wrapper.component';
import { CommandsComponent } from './commands/commands.component';
import { InfoBoxComponent } from '../../shered/info-box/info-box.component';
import { SlotsComponent } from './slots/slots.component';
import { SongVolumeComponent } from './song-volume/song-volume.component';
import { SongQueueComponent } from './song-queue/song-queue.component';

@Component({
    selector: 'app-rewards',
    imports: [
        GridWrapperComponent,
        InfoBoxComponent,
        CommandsComponent,
        SongVolumeComponent,
        SlotsComponent,
        SongQueueComponent,
    ],
    templateUrl: './rewards.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './rewards.component.scss'
})
export class RewardsComponent {}
