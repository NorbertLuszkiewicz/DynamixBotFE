import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-layout-main',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './layout-main.component.html',
  styleUrl: './layout-main.component.scss',
})
export class LayoutMainComponent {}
