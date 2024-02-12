import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ErrorBoxComponent } from './core/components/error-box/error-box.component';
import { SuccessBoxComponent } from './core/components/success-box/success-box.component';
import { LayoutMainComponent } from './core/layouts/layout-main/layout-main.component';
import { AuthService } from './services/auth.service';
import { ConnectionsService } from './services/connections.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LayoutMainComponent, ErrorBoxComponent, SuccessBoxComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  public readonly errorMessage = this.authService.errorMessage;
  public readonly successMessage = this.authService.successMessage;

  constructor(private authService: AuthService, private connectionsService: ConnectionsService) {}

  public ngOnInit(): void {
    this.authService.getNewUser();
    this.connectionsService.getRiotUser();
    this.connectionsService.getSongsUser();
    this.connectionsService.getCommands();
  }
}
