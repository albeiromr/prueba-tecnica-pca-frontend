import { Component } from '@angular/core';
import { BaseHttpService } from '../../services/base-http.service';
import { ReservationModel } from '../../models/reservation.model';
import { CommonModule } from '@angular/common';
import { DataNormailizationService } from '../../services/data-normailization.service';

@Component({
  selector: 'app-my-reservations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-reservations.component.html',
  styleUrl: './my-reservations.component.scss'
})
export class MyReservationsComponent {

  public reservations: ReservationModel[] = [];

  constructor(
    private _baseHttpService: BaseHttpService,
    private _dataNormalizationService: DataNormailizationService
  ){
    this.getReservations();
  }

  public getReservations(): void {
    this._baseHttpService.getReservations().subscribe(res => {
      if(!res.success)throw new Error("there was an error when fetching the database reservations")
      this.reservations = res.data;
    })
  }

  public getReadableReservationDate(date: string): string{
    const parsedDate: Date = new Date(date);
    return this._dataNormalizationService.serializeDateForClient(parsedDate);
  }
}
