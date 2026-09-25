import { ChangeDetectionStrategy, Component, Signal, computed, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { Slot } from '../../../models/interfaces';
import { ConnectionsService } from '../../../services/connections.service';
import { RewardsService } from '../../../services/rewards.service';
import { StorageService } from '../../../core/services/storage.service';
import { InfoBoxComponent } from '../../../shared/info-box/info-box.component';

@Component({
  selector: 'app-slots',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatSlideToggleModule,
    MatIconModule,
    MatButtonModule,
    InfoBoxComponent,
  ],
  templateUrl: './slots.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './slots.component.scss',
})
export class SlotsComponent {
  private readonly connectionsService = inject(ConnectionsService);
  private readonly rewardsService = inject(RewardsService);
  private readonly storage = inject(StorageService);

  private readonly $userCommands = this.connectionsService.$userCommands;

  public readonly $slots: Signal<Slot[]> = computed(() => this.$userCommands()?.slotsID ?? []);

  public readonly displayedColumns: string[] = [
    'name',
    'withBan',
    'emotes',
    'times',
    'wins',
    'id',
    'last-winners',
    'delete',
  ];

  public slotsData = {
    name: '',
    emotes: 7,
    withBan: false,
  };

  public winningPercentage = this.calcWinningPercentage();

  public ngOnInit(): void {
    this.winningPercentage = this.calcWinningPercentage();
  }

  public calcWinningPercentage(): string {
    return ((1 / (this.slotsData.emotes * this.slotsData.emotes)) * 100).toFixed(2);
  }

  public deleteSlot(slot: Slot): void {
    if (!slot.id) {
      return;
    }

    this.rewardsService.removeSlot(String(slot.id), this.storage.userName).subscribe();
  }

  public createSlotsAward(): void {
    this.rewardsService
      .addSlotsAward(this.slotsData.name, this.slotsData.emotes, this.slotsData.withBan, this.storage.userName)
      .subscribe();
  }
}
