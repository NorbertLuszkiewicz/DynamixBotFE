import { CommonModule } from '@angular/common';
import { Component, effect, computed, Signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';

import { RewardsService } from '../../../services/rewards.service';
import { Slot } from '../../../models/interfaces';
import { InfoBoxComponent } from '../../../shered/info-box/info-box.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ConnectionsService } from '../../../services/connections.service';
import { MatCommonModule } from '@angular/material/core';

@Component({
  selector: 'app-slots',
  standalone: true,
  imports: [
    CommonModule,
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
    MatCommonModule,
  ],
  templateUrl: './slots.component.html',
  styleUrl: './slots.component.scss',
})
export class SlotsComponent {
  private readonly $userCommands = this.connectionsService.$userCommands;
  public readonly $slots: Signal<Slot[]> = computed(() => this.$userCommands().slotsID || []);
  public displayedColumns: string[] = ['name', 'withBan', 'emotes', 'times', 'wins', 'id', 'last-winners', 'delete'];
  public slotsData = {
    name: '',
    emotes: 7,
    withBan: false,
  };
  public winningPercentage: string;

  constructor(private connectionsService: ConnectionsService, private rewardService: RewardsService) {}
  public ngOnInit(): void {
    this.calcWinningPercentage();
  }

  public calcWinningPercentage(): void {
    this.winningPercentage = ((1 / (this.slotsData.emotes * this.slotsData.emotes)) * 100).toFixed(2);
  }

  public deleteSlot(slot: Slot): void {
    const name = localStorage.getItem('name');
    this.rewardService.removeSlot(slot.name, name).subscribe();
  }

  public createSlotsAward(): void {
    console.log(this.slotsData.withBan);
    const name = localStorage.getItem('name');
    this.rewardService
      .addSlotsAward(this.slotsData.name, this.slotsData.emotes, this.slotsData.withBan, name)
      .subscribe();
  }
}
