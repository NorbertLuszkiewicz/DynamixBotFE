import { Component, ChangeDetectionStrategy } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
    selector: 'app-layout-main',
    imports: [HeaderComponent, FooterComponent],
    templateUrl: './layout-main.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './layout-main.component.scss'
})
export class LayoutMainComponent {}
