import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { BaseHttpService } from '../../services/base-http.service';
import { CityModel } from '../../models/city.model';

@Component({
  selector: 'app-create-flight',
  standalone: true,
  imports: [CardModule, DropdownModule, ReactiveFormsModule, CommonModule],
  templateUrl: './create-flight.component.html',
  styleUrl: './create-flight.component.scss'
})
export class CreateFlightComponent {
  public cities: CityModel[] = [];
  public createFlightForm: FormGroup;

  constructor(private _baseHttpService: BaseHttpService){

    this.getCities();

    this.createFlightForm = new FormGroup({
      airlineName: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      origin: new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
      destination: new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
      departureDate: new FormControl(null, [Validators.required]),
      arrivalDate: new FormControl(null, [Validators.required]),
      flightPrice: new FormControl(0, [Validators.required, Validators.min(1000), Validators.max(100000)]),
    });

  }

  public getCities(): void {

    this._baseHttpService.getCities().subscribe(res => {
      if(!res.success)throw new Error("there was an error when fetching the database cities")
      this.cities = res.data;
    })
    
  }
  
}
