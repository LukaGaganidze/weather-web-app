import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { WeatherDataCityInputService } from 'src/app/services/api/weather-data-city-input.service';
import {
  WeatherDataCityCoordsInterfaceFiltered,
  WeatherDataForFiveDaysFromServerFiltered,
} from 'src/app/services/api/weather-data-types';
import { WeatherFiveDayServiceInputService } from 'src/app/services/api/weather-five-day-service-input.service';

@Component({
  selector: 'app-city-weather-input',
  templateUrl: './city-weather-input.component.html',
  styleUrls: ['./city-weather-input.component.scss'],
})
export class CityWeatherInputComponent implements OnInit {
  // for current day weather
  mainData$!: Observable<WeatherDataCityCoordsInterfaceFiltered>;
  dynamicBackgroundValCur = '';
  fiveDaysData$!: Observable<WeatherDataForFiveDaysFromServerFiltered[]>;

  // for future 5  days weather
  // fiveDaysData$!: Observable<WeatherDataForFiveDaysFromServerFiltered[]>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private wetherInputSer: WeatherDataCityInputService,
    private fiveDayForecastSer: WeatherFiveDayServiceInputService
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0); // Scroll to the top of the page

    this.route.queryParams.subscribe((params) => {
      if (params['city']) {
        window.scrollTo(0, 0);
        this.wetherInputSer.getWeatherDataWithInput(params['city']);

        // data  for template current weatehr
        this.mainData$ = this.wetherInputSer.getWeatherDataWithInput(
          params['city']
        );
        this.wetherInputSer
          .getWeatherDataWithInput(params['city'])
          .subscribe(
            (data) => (this.dynamicBackgroundValCur = data.weather_desc)
          );

        //  // data  for template future 5  days weather
        this.fiveDaysData$ =
          this.fiveDayForecastSer.getWeatherDataForFivedaysInput(
            params['city']
          );
      } else {
        this.router.navigate(['']);
      }
    });
  }
}
