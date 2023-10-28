import { Component, Input, OnInit } from '@angular/core';
import { WeatherDataCityCoordsInterfaceFiltered } from '../../../services/api/weather-data-types';

import { Observable } from 'rxjs';

@Component({
  selector: 'city-weather-current',
  templateUrl: './city-weather.component.html',
  styleUrls: ['./city-weather.component.scss'],
})
export class CityWeatherComponent implements OnInit {
  @Input('weatherData')
  mainData$!: Observable<WeatherDataCityCoordsInterfaceFiltered>;
  @Input('dynamicBackGr') dynamicBackgroundVal = '';

  constructor() {}

  ngOnInit(): void {}

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
