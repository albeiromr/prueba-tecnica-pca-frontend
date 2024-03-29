import { Component } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { DataNormailizationService } from '../../services/data-normailization.service';
import { BaseHttpService } from '../../services/base-http.service';
import { AirlineWithFlightCount } from '../../models/airline-flight-count.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [ChartModule, CommonModule],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss'
})
export class StatisticsComponent {

  public payData: any;
  public payOptions: any;
  public sortedAirlins: AirlineWithFlightCount[] = [];
  public totalAirLines: number = 0;

  constructor(
    private _dataNormalizationService: DataNormailizationService,
    private _baseHttpService: BaseHttpService
  ) {
    this.getAirlines();
  }

  public getAirlines(): void {
    this._baseHttpService.getAirlines().subscribe(res => {
      if(!res.success)throw new Error("there was an error when fetching the database airlines")
      this.sortedAirlins = this._dataNormalizationService.getTopAirlines(res.data);
      this.totalAirLines = res.data.length;
      this.setupPieChart();
    })
  }

  public async setupPieChart(){
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.payData = {
      labels: [
        this.sortedAirlins[0].airLineName,
        this.sortedAirlins[1].airLineName,
        this.sortedAirlins[2].airLineName,
        this.sortedAirlins[3].airLineName,
      ],
      datasets: [
        {
          data: [
            this.sortedAirlins[0].flightCount,
            this.sortedAirlins[1].flightCount,
            this.sortedAirlins[2].flightCount,
            this.sortedAirlins[3].flightCount,
          ],
          backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
          hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
        }
      ]
    };

    this.payOptions = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor
          }
        }
      }
    };
  }
}
