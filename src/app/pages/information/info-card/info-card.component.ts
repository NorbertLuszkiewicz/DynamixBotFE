
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Commend } from '../../../models/interfaces';

@Component({
    selector: 'app-info-card',
    imports: [],
    templateUrl: './info-card.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './info-card.component.scss'
})
export class InfoCardComponent {
  @Input() commendList: Commend[];

  identify(i: number): number {
    return i;
  }
}
