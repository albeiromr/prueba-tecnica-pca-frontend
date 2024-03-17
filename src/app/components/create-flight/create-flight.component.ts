import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { BaseHttpService } from '../../services/base-http.service';
import { CityModel } from '../../models/city.model';
import { AirlineModel } from '../../models/airline.model';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { DataNormailizationService } from '../../services/data-normailization.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-create-flight',
  standalone: true,
  imports: [
    CardModule, 
    DropdownModule, 
    ReactiveFormsModule, 
    CommonModule, 
    CalendarModule, 
    InputNumberModule,
    ButtonModule,
    ProgressSpinnerModule,
  ],
  templateUrl: './create-flight.component.html',
  styleUrl: './create-flight.component.scss'
})
export class CreateFlightComponent {
  public cities: CityModel[] = [];
  public airlines: AirlineModel[] = [];
  public createFlightForm: FormGroup;

  public loading: boolean = false;

  constructor(
    private _baseHttpService: BaseHttpService, 
    private _dataNormalizationService: DataNormailizationService
  ){

    this.getCities();
    this.getAirlines();

    this.createFlightForm = new FormGroup({
      airlineName: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      origin: new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
      destination: new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
      departureDate: new FormControl(null, [Validators.required]),
      arrivalDate: new FormControl(null, [Validators.required]),
      flightPrice: new FormControl(0, [Validators.required, Validators.min(1000), Validators.max(100000000)]),
    });

  }

  public getCities(): void {
    this._baseHttpService.getCities().subscribe(res => {
      if(!res.success)throw new Error("there was an error when fetching the database cities")
      this.cities = res.data;
    })
  }

  public getAirlines(): void {
    this._baseHttpService.getAirlines().subscribe(res => {
      if(!res.success)throw new Error("there was an error when fetching the database airlines")
      this.airlines = res.data;
    })
  }

  /**
   * Creates a new flight in the database
   */
  public createFlight(){
    this.loading = true;
    this.createFlightForm.disable();
    const body = this._dataNormalizationService.serializeFlightBody(this.createFlightForm.value);
    
    this._baseHttpService.createFlight(body).subscribe(res => {
      if(!res.success)throw new Error("there was an error when creating the flight in database");
      
      setTimeout(() => { 
        this.createFlightForm.reset();
        this.createFlightForm.enable();
        this.loading = false
      }, 1000);

    });
  }
  
}
