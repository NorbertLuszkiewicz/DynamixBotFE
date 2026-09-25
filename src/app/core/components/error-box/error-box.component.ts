import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-error-box',
  imports: [],
  templateUrl: './error-box.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './error-box.component.scss',
})
export class ErrorBoxComponent {
  private readonly authService = inject(AuthService);

  public readonly message = this.authService.errorMessage;

  public ngOnInit(): void {
    setTimeout(() => this.authService.setErrorMessage(null), 5000);
  }
}
