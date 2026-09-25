import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ErrorBoxComponent } from './core/components/error-box/error-box.component';
import { SuccessBoxComponent } from './core/components/success-box/success-box.component';
import { LayoutMainComponent } from './core/layouts/layout-main/layout-main.component';
import { AuthService } from './services/auth.service';
import { ConnectionsService } from './services/connections.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LayoutMainComponent, ErrorBoxComponent, SuccessBoxComponent],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly connectionsService = inject(ConnectionsService);

  public readonly errorMessage = this.authService.errorMessage;
  public readonly successMessage = this.authService.successMessage;

  public ngOnInit(): void {
    this.authService.getNewUser();
    this.connectionsService.getRiotUser();
    this.connectionsService.getSongsUser();
    this.connectionsService.getCommands();
  }
}
