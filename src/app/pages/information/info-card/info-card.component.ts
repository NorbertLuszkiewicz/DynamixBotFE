import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Commend } from '../../../models/interfaces';

@Component({
  selector: 'app-info-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info-card.component.html',
  styleUrl: './info-card.component.scss',
})
export class InfoCardComponent {
  @Input() commendList: Commend[];

  identify(i: number): number {
    return i;
  }
}
