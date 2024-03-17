import { Component, inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ClientService } from './services/client.service';
import { ClientModel } from './models/client.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  public clientData: ClientModel = {} as ClientModel;

  constructor(private _clientService: ClientService){
    this.clientData  = this._clientService.getClientData;
  }
}
