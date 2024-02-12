import { NgClass, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-box',
  standalone: true,
  imports: [NgClass, NgIf],
  templateUrl: './info-box.component.html',
  styleUrl: './info-box.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoBoxComponent {
  @Input() title: string;
  @Input() small: boolean;
  @Input() center: boolean;
}
