import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponseModel } from '../models/base-response.model';
import { CityModel } from '../models/city.model';

@Injectable({
  providedIn: 'root'
})
export class BaseHttpService {

  private _getCitiesEndpoint: string = "http://localhost:5151/api/cities"

  constructor(private _httclient: HttpClient) { }

  /**
   * Fetches all the database cities
   */
  public getCities(): Observable<BaseResponseModel<CityModel[]>>{
    return this._httclient.get<BaseResponseModel<CityModel[]>>(this._getCitiesEndpoint)
  }
}
