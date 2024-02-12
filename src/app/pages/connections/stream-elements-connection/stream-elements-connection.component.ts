import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { StreamElementsForm } from '../../../models/interfaces';
import { ConnectionsService } from '../../../services/connections.service';
import { InfoBoxComponent } from '../../../shered/info-box/info-box.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-stream-elements-connection',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InfoBoxComponent,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './stream-elements-connection.component.html',
  styleUrl: './stream-elements-connection.component.scss',
})
export class StreamElementsConnectionComponent {
  constructor(private connectionsService: ConnectionsService) {}
  public streamElementsData: StreamElementsForm = {
    accountId: null,
    jwtToken: null,
  };

  public createStreamElements(): void {
    const name = localStorage.getItem('name');
    this.connectionsService
      .connectStreamElements(this.streamElementsData.accountId, this.streamElementsData.jwtToken, name)
      .subscribe();
  }
}
