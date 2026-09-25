import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Command } from '../../../models/interfaces';

@Component({
  selector: 'app-info-card',
  imports: [],
  templateUrl: './info-card.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './info-card.component.scss',
})
export class InfoCardComponent {
  public readonly commandList = input<Command[]>([]);
}
