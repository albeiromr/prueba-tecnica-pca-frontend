import { Injectable } from '@angular/core';
import { CreateFlightBody, CreateFlightForm } from '../models/create-flight.model';
import { AirlineModel } from '../models/airline.model';
import { AirlineWithFlightCount } from '../models/airline-flight-count.model';

@Injectable({
  providedIn: 'root'
})
export class DataNormailizationService {

  constructor() { }

  /**
   * serializes a new Date() javascript data tipe to 
   * the one that the backend requieres
   */
  public serializeDateForDb(date: Date): string {
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
   * serializes a new Date() javascript data tipe to 
   * the one that the client can read
   */
  public serializeDateForClient(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // El mes comienza desde 0
    const year = date.getFullYear();
  
    // creates the string date
    const formattedDateString = `${day}-${month}-${year}`;
  
    return formattedDateString;
  }

  /**
   * serializes the create flight reactive form data
   */
  public serializeFlightBody(data: CreateFlightForm): CreateFlightBody {
    const body: CreateFlightBody = {
      airlineName: data.airlineName.name,
      origin: data.origin.cityName,
      destination: data.destination.cityName,
      departureDate: this.serializeDateForDb(data.departureDate),
      arrivalDate: this.serializeDateForDb(data.arrivalDate),
      flightPrice: data.flightPrice
    }
    return body;
  }

  /**
   * Returns the first four airlines with more flights
   */
  getTopAirlines(airlines: AirlineModel[]): AirlineWithFlightCount[] {
    // Sort the airlines by the number of flights (from highest to lowest)
    const sortedAirlines = airlines.sort((a, b) => b.flightsCount - a.flightsCount);
  
    //gets the first four airlines with more flights
    const topAirlines = sortedAirlines.slice(0, 4).map(({ name, flightsCount }) => ({ airLineName: name, flightCount: flightsCount }));
  
    return topAirlines;
  }
}
