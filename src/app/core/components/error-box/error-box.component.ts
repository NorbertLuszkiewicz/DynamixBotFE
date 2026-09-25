import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'app-error-box',
    imports: [],
    templateUrl: './error-box.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './error-box.component.scss'
})
export class ErrorBoxComponent {
  public readonly message = this.authService.errorMessage;

  constructor(private authService: AuthService) {}

  public ngOnInit(): void {
    setTimeout(() => this.authService.errorMessage.set(null), 5000);
  }
}
