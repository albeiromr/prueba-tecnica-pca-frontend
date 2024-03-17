import { Component } from '@angular/core';
import { BaseHttpService } from '../../services/base-http.service';
import { FlightModel } from '../../models/flight.model';
import { DataNormailizationService } from '../../services/data-normailization.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-make-reservation',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './make-reservation.component.html',
  styleUrl: './make-reservation.component.scss'
})
export class MakeReservationComponent {

  public flights: FlightModel[] = [];

  constructor(
    private _baseHttpService: BaseHttpService,
    private _dataNormalizationService: DataNormailizationService
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
}
