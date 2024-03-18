import { Component } from '@angular/core';
import { BaseHttpService } from '../../services/base-http.service';
import { FlightModel } from '../../models/flight.model';
import { DataNormailizationService } from '../../services/data-normailization.service';
import { ButtonModule } from 'primeng/button';
import { CreateReservationModel } from '../../models/create-reservation.model';
import { ClientService } from '../../services/client.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CityModel } from '../../models/city.model';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-make-reservation',
  standalone: true,
  imports: [
    ButtonModule, 
    ToastModule, 
    ReactiveFormsModule,
    DropdownModule,
    CommonModule
  ],
  providers: [MessageService],
  templateUrl: './make-reservation.component.html',
  styleUrl: './make-reservation.component.scss'
})
export class MakeReservationComponent {

  public filterFlightForm: FormGroup;

  public flights: FlightModel[] = [];
  public filterdFlightArray: FlightModel[] = [];
  public cities: CityModel[] = [];
  public loading: boolean = false;

  constructor(
    private _baseHttpService: BaseHttpService,
    private _dataNormalizationService: DataNormailizationService,
    private _clientService: ClientService,
    private _messageService: MessageService
  ){
    this.getFlights();
    this.getCities();

    this.filterFlightForm = new FormGroup({
      origin: new FormControl(null, [Validators.minLength(5), Validators.maxLength(20)]),
      destination: new FormControl(null, [Validators.minLength(5), Validators.maxLength(20)])
    });
  }

  /**
   * filter all flights by the given parameters
   */
  public async filterFlghts(){
    const origin: string | undefined = this.filterFlightForm.value.origin?.cityName;
    const destination: string | undefined = this.filterFlightForm.value.destination?.cityName;

    if(origin === undefined && destination === undefined ) this.filterdFlightArray = this.flights;

    if(origin !== undefined && destination === undefined){
      const filteredFlights = this.flights.filter(f => f.origin === origin);
      this.filterdFlightArray = filteredFlights;
    }

    if(origin === undefined && destination !== undefined){
      const filteredFlights = this.flights.filter(f => f.destination === destination);
      this.filterdFlightArray = filteredFlights;
    }

    if(origin !== undefined && destination !== undefined){
      const filteredFlights = this.flights.filter(f => f.destination === destination && f.origin === origin);
      this.filterdFlightArray = filteredFlights;
    }
  }

  /**
   * Cleans all flights filter form filters and reload all the flights into the database
   */
  public cleanFilters(){
    this.filterFlightForm.reset();
    this.filterdFlightArray = this.flights;
  }

  public getFlights(): void {
    this._baseHttpService.getFlights().subscribe(res => {
      if(!res.success)throw new Error("there was an error when fetching the database flights");
      this.flights = res.data;
      this.filterdFlightArray = res.data;
    })
  }

  public getCities(): void {
    this._baseHttpService.getCities().subscribe(res => {
      if(!res.success)throw new Error("there was an error when fetching the database cities")
      this.cities = res.data;
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
      }, 300);
    });
  }
}
