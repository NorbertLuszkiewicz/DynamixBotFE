import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-info-box',
  imports: [NgClass],
  templateUrl: './info-box.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './info-box.component.scss',
})
export class InfoBoxComponent {
  public readonly title = input<string>();
  public readonly small = input(false);
  public readonly center = input(false);
}
