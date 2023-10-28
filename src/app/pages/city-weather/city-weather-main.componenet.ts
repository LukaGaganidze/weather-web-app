import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

// interfaces
import {
  WeatherDataCityCoordsInterfaceFiltered,
  WeatherDataForFiveDaysFromServerFiltered,
} from '../../services/api/weather-data-types';
import { LatLngObj } from '../../services/api/weather-data-types';

// services
import { WeatherDataCityCoordsService } from 'src/app/services/api/weather-data-city-coords.service';
import { WeatherFiveDayServiceService } from 'src/app/services/api/weather-five-day-service.service';

@Component({
  selector: 'city-weather-main-forecast',
  templateUrl: './city-weather-main.component.html',
})
export class CityWeatherMainComponenet implements OnInit {
  // for current day weather
  mainData$!: Observable<WeatherDataCityCoordsInterfaceFiltered>;
  dynamicBackgroundValCur = '';

  // for future 5  days weather
  fiveDaysData$!: Observable<WeatherDataForFiveDaysFromServerFiltered[]>;

  constructor(
    private weatherDataSerWCoords: WeatherDataCityCoordsService,
    private fiveDaysDataSer: WeatherFiveDayServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0); // Scroll to the top of the page
    // accessing query params for lat and lng
    // the query params are send if we land on landing page and there are query params from geolocation api
    this.route.queryParams.subscribe((params) => {
      const lat = params['lat'];
      const lng = params['lng'];

      if (!lat || !lng) {
        this.router.navigate(['']);
      } else {
        window.scrollTo(0, 0);
        const locationCoords: LatLngObj = {
          lat,
          lng,
        };

        // data  for template current weatehr
        this.mainData$ =
          this.weatherDataSerWCoords.getWeatherDataWithCoords(locationCoords);
        this.weatherDataSerWCoords
          .getWeatherDataWithCoords(locationCoords)
          .subscribe(
            (data) => (this.dynamicBackgroundValCur = data.weather_desc)
          );

        // data  for template future 5  days weather
        this.fiveDaysData$ =
          this.fiveDaysDataSer.getWeatherDataForFivedays(locationCoords);
      }
    });
  }
}
