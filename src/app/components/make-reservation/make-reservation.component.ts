import { Component } from '@angular/core';
import { BaseHttpService } from '../../services/base-http.service';
import { FlightModel } from '../../models/flight.model';
import { DataNormailizationService } from '../../services/data-normailization.service';
import { ButtonModule } from 'primeng/button';
import { CreateReservationModel } from '../../models/create-reservation.model';
import { ClientService } from '../../services/client.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-make-reservation',
  standalone: true,
  imports: [ButtonModule, ToastModule],
  providers: [MessageService],
  templateUrl: './make-reservation.component.html',
  styleUrl: './make-reservation.component.scss'
})
export class MakeReservationComponent {

  public flights: FlightModel[] = [];
  public loading: boolean = false;

  constructor(
    private _baseHttpService: BaseHttpService,
    private _dataNormalizationService: DataNormailizationService,
    private _clientService: ClientService,
    private _messageService: MessageService
  ){
    this.getFlights();
  }

  public getFlights(): void {
    this._baseHttpService.getFlights().subscribe(res => {
      if(!res.success)throw new Error("there was an error when fetching the database flights");
      this.flights = res.data;
    })
  }

  public getReadableDate(date: string): string{
    const parsedDate: Date = new Date(date);
    return this._dataNormalizationService.serializeDateForClient(parsedDate);
  }

  /**
   * Creates a new reservation in the database
   */
  public createReservation(flightCode: string){
    this.loading = true;
    const clientData = this._clientService.getClientData;
    const body: CreateReservationModel = {
      clientName: clientData.clientName,
      clientLastName: clientData.clientLastName,
      clientEmail: clientData.clientEmail,
      flightCode: flightCode
    }
    
    this._baseHttpService.createReservation(body).subscribe(res => {
      if(!res.success)throw new Error("there was an error when creating the reservation in database");
            
      setTimeout(() => { 
        this.loading = false
        this._messageService.add({ 
          severity: 'success', 
          summary: 'Bien Hecho!!', 
          detail: 'Tu reservación se generó exitosamente' 
        });
      }, 1000);
    });
  }
}
