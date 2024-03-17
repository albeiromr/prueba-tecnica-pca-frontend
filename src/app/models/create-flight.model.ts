import { AirlineModel } from "./airline.model"
import { CityModel } from "./city.model";

export interface CreateFlightForm {
    airlineName: AirlineModel;
    origin: CityModel;
    destination: CityModel;
    departureDate: Date;
    arrivalDate: Date;
    flightPrice: number;
    
}

export interface CreateFlightBody {
    airlineName: string;
    origin: string;
    destination: string;
    departureDate: string;
    arrivalDate: string;
    flightPrice: number;
}