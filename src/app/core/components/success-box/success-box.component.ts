import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-success-box',
  imports: [],
  templateUrl: './success-box.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './success-box.component.scss',
})
export class SuccessBoxComponent {
  private readonly authService = inject(AuthService);

  public readonly message = this.authService.successMessage;

  public ngOnInit(): void {
    setTimeout(() => this.authService.setSuccessMessage(null), 5000);
  }
}
