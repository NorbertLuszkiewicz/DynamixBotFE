import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-grid-wrapper',
  standalone: true,
  imports: [],
  templateUrl: './grid-wrapper.component.html',
  styleUrl: './grid-wrapper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridWrapperComponent {}
