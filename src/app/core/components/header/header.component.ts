import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [NgClass, MatToolbarModule, MatButtonModule, MatDividerModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly authService = inject(AuthService);

  private readonly loginUrl = environment.loginRedirect;

  public readonly isLoggedIn = this.authService.$user;
  public readonly isOpenMenu = signal(false);
  public readonly isHandset = toSignal(
    this.breakpointObserver.observe(Breakpoints.Handset).pipe(map((result) => result.matches)),
    { initialValue: false }
  );

  public toggleMenu(): void {
    this.isOpenMenu.update((isOpen) => !isOpen);
  }

  public closeMenu(): void {
    this.isOpenMenu.set(false);
  }

  public login(): void {
    window.location.href = this.loginUrl;
  }

  public logout(): void {
    this.authService.logout();
  }
}
