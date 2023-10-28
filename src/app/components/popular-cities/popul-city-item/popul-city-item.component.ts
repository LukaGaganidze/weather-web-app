import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherDataCityInputService } from 'src/app/services/api/weather-data-city-input.service';
import { WeatherDataCityCoordsInterfaceFiltered } from 'src/app/services/api/weather-data-types';

import { Router } from '@angular/router';

@Component({
  selector: 'app-popul-city-item',
  templateUrl: './popul-city-item.component.html',
  styleUrls: ['./popul-city-item.component.scss'],
})
export class PopulCityItemComponent implements OnInit {
  @Input('cityName') city: string = '';

  cityData$!: Observable<WeatherDataCityCoordsInterfaceFiltered>;

  constructor(
    private weatherCityInputSer: WeatherDataCityInputService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cityData$ = this.weatherCityInputSer.getWeatherDataWithInput(
      this.city
    );
  }

  navigateToCity(city: string) {
    this.router.navigate(['city'], {
      queryParams: {
        city: city,
      },
    });
  }
}
