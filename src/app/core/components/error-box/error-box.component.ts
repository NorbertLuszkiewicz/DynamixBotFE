import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-error-box',
  standalone: true,
  imports: [],
  templateUrl: './error-box.component.html',
  styleUrl: './error-box.component.scss',
})
export class ErrorBoxComponent {
  public readonly message = this.authService.errorMessage;

  constructor(private authService: AuthService) {}

  public ngOnInit(): void {
    setTimeout(() => this.authService.errorMessage.set(null), 5000);
  }
}
