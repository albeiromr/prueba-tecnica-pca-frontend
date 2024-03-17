import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponseModel } from '../models/base-response.model';
import { CityModel } from '../models/city.model';
import { AirlineModel } from '../models/airline.model';
import { CreateFlightBody } from '../models/create-flight.model';
import { FlightModel } from '../models/flight.model';
import { CreateReservationModel } from '../models/create-reservation.model';
import { ReservationModel } from '../models/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class BaseHttpService {

  private _getCitiesEndpoint: string = "http://localhost:5151/api/cities";
  private _getAirlinesEndpoint: string = "http://localhost:5151/api/airlines";
  private _createFlightEndpoint: string = "http://localhost:5151/api/flights/create";
  private _getFlightEndpoint: string = "http://localhost:5151/api/flights";
  private _createReservationEndpoint: string = "http://localhost:5151/api/reservations/create";
  private _getReservationsEndpoint: string = "http://localhost:5151/api/reservations";

  constructor(private _httclient: HttpClient) { }

  /**
   * Fetches all the database cities
   */
  public getCities(): Observable<BaseResponseModel<CityModel[]>>{
    return this._httclient.get<BaseResponseModel<CityModel[]>>(this._getCitiesEndpoint)
  }

  /**
   * Fetches all the database airlines
   */
  public getAirlines(): Observable<BaseResponseModel<AirlineModel[]>>{
    return this._httclient.get<BaseResponseModel<AirlineModel[]>>(this._getAirlinesEndpoint)
  }

  /**
   * Fetches all the database flights
   */
  public getFlights(): Observable<BaseResponseModel<FlightModel[]>>{
    return this._httclient.get<BaseResponseModel<FlightModel[]>>(this._getFlightEndpoint)
  }

  /**
   * Fetches all the database reservations
   */
  public getReservations(): Observable<BaseResponseModel<ReservationModel[]>>{
    return this._httclient.get<BaseResponseModel<ReservationModel[]>>(this._getReservationsEndpoint)
  }

  /**
   * Create a new flight in the database
   */
  public createFlight(body: CreateFlightBody): Observable<BaseResponseModel<null>>{
    return this._httclient.post<BaseResponseModel<null>>(this._createFlightEndpoint, body)
  }

  /**
   * Create a new reservation in the database
   */
  public createReservation(body: CreateReservationModel): Observable<BaseResponseModel<null>>{
    return this._httclient.post<BaseResponseModel<null>>(this._createReservationEndpoint, body)
  }
}
