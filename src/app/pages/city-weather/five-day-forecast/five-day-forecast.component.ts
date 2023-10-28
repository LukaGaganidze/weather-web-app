import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { WeatherDataForFiveDaysFromServerFiltered } from 'src/app/services/api/weather-data-types';

@Component({
  selector: 'app-five-day-forecast',
  templateUrl: './five-day-forecast.component.html',
  styleUrls: ['./five-day-forecast.component.scss'],
})
export class FiveDayForecastComponent implements OnInit {
  @Input('forecastDAta')
  fiveDaysForecast$!: Observable<WeatherDataForFiveDaysFromServerFiltered>;

  @Input('dybamicBackground') dynamicBackgroundVal!: any;

  ngOnInit(): void {
    this.fiveDaysForecast$.subscribe((data) => {});
  }

  getBackgroundImage() {
    if (this.dynamicBackgroundVal === '') {
      this.dynamicBackgroundVal = 'wild-card';
    }

    const linearGradient =
      'linear-gradient(to right, rgba(0, 0, 0, .2), rgba(0, 0, 0, .2))';
    const imageUrl = `url('../../../assets/pages/home/weather-types/${this.dynamicBackgroundVal.toLocaleLowerCase()}-sq.jpg')`;

    return `${linearGradient}, ${imageUrl}`;
  }
}
