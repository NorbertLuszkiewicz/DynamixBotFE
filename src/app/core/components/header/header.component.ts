import { Component, signal } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../services/auth.service';
import { environment } from '../../../../environments/environment';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatDividerModule, RouterModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public isOpenMenu: boolean = false;
  public readonly loginUrl = environment.loginRedirect;
  public readonly isLoggedIn = this.authService.$user;
  public readonly isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    tap((result) => result && (this.isOpenMenu = false))
  );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private router: Router
  ) {}

  public changeMenu() {
    this.isOpenMenu = !this.isOpenMenu;
  }

  public login() {
    window.location.href = environment.loginRedirect;
  }

  public logout() {
    this.authService.logout();
    this.router.navigate(['/information']);
  }
}
