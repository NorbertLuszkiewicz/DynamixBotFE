import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-success-box',
  standalone: true,
  imports: [],
  templateUrl: './success-box.component.html',
  styleUrl: './success-box.component.scss',
})
export class SuccessBoxComponent {
  public readonly message = this.authService.successMessage;

  constructor(private authService: AuthService) {}

  public ngOnInit(): void {
    setTimeout(() => this.authService.successMessage.set(null), 5000);
  }
}
