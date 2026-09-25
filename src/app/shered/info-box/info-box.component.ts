import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'app-info-box',
    imports: [NgClass],
    templateUrl: './info-box.component.html',
    styleUrl: './info-box.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoBoxComponent {
  @Input() title: string;
  @Input() small: boolean;
  @Input() center: boolean;
}
