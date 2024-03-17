import { Injectable } from '@angular/core';
import { ClientModel } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
/**
 * Contains all client personal data
*/
export class ClientService {

  private readonly clientData: ClientModel = {
    clientName: "antonio",
    clientLastName: "escallón",
    clientEmail: "testemail@email.com"
  }

  get getClientData(): ClientModel {
    return this.clientData;
  }

  constructor() { }
}

