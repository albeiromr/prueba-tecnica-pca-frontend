import { Component } from '@angular/core';
import { BaseHttpService } from '../../services/base-http.service';
import { FlightModel } from '../../models/flight.model';

@Component({
  selector: 'app-make-reservation',
  standalone: true,
  imports: [],
  templateUrl: './make-reservation.component.html',
  styleUrl: './make-reservation.component.scss'
})
export class MakeReservationComponent {

  public flights: FlightModel[] = [];

  constructor(private _baseHttpService: BaseHttpService){
    this.getFlights();
  }

  public getFlights(): void {
    this._baseHttpService.getFlights().subscribe(res => {
      if(!res.success)throw new Error("there was an error when fetching the database flights")
      this.flights = res.data;
    })
  }
}
