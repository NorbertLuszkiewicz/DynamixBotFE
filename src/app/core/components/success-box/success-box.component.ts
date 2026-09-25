import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'app-success-box',
    imports: [],
    templateUrl: './success-box.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './success-box.component.scss'
})
export class SuccessBoxComponent {
  public readonly message = this.authService.successMessage;

  constructor(private authService: AuthService) {}

  public ngOnInit(): void {
    setTimeout(() => this.authService.successMessage.set(null), 5000);
  }
}
