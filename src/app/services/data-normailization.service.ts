import { Injectable } from '@angular/core';
import { CreateFlightBody, CreateFlightForm } from '../models/create-flight.model';

@Injectable({
  providedIn: 'root'
})
export class DataNormailizationService {

  constructor() { }

  /**
   * serializes a new Date() javascript data tipe to 
   * the one that the backend requieres
   */
  public serializeDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // the month start in 0
    const day = String(date.getDate()).padStart(2, '0');
    const hours = '00';
    const minutes = '00';
    const seconds = '00';
    const timezone = 'Z'; // Z represents UTC

    // creates the string date
    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${timezone}`;

    return formattedDate;
  }

  /**
   * serializes the create flight reactive form data
   */
  public serializeFlightBody(data: CreateFlightForm): CreateFlightBody {
    const body: CreateFlightBody = {
      airlineName: data.airlineName.name,
      origin: data.origin.cityName,
      destination: data.destination.cityName,
      departureDate: this.serializeDate(data.departureDate),
      arrivalDate: this.serializeDate(data.arrivalDate),
      flightPrice: data.flightPrice
    }
    return body;
  }
}
