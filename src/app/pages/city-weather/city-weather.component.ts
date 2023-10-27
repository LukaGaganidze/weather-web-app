import { Component } from '@angular/core';
import { WeatherDataCityCoordsInterfaceFiltered } from '../../services/api/weather-data-types';
import { UserLocationService } from 'src/app/services/geolocation/user-location.service';
import { WeatherDataCityCoordsService } from 'src/app/services/api/weather-data-city-coords.service';
import { LatLngObj } from '../city-weather/home-types';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './city-weather.component.html',
  styleUrls: ['./city-weather.component.scss'],
})
export class CityWeatherComponent {
  mainData$!: Observable<WeatherDataCityCoordsInterfaceFiltered>;

  dynamicBackgroundVal = '';

  backgrounUrl =
    ' ../../../assets/pages/home/weather-types/' + 'thunderstorm-sq' + '.jpg';

  constructor(
    private locationSer: UserLocationService,
    private weatherDataSerWCoords: WeatherDataCityCoordsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // accessing query params for lat and lng
    // the query params are send if we land on landing page and there are query params from geolocation api

    this.route.queryParams.subscribe((params) => {
      const lat = params['lat'];
      const lng = params['lng'];

      if (!lat || !lng) {
        this.router.navigate(['']);
      } else {
        const locationCoords: LatLngObj = {
          lat,
          lng,
        };

        // data  for template
        this.mainData$ =
          this.weatherDataSerWCoords.getWeatherDataWithCoords(locationCoords);

        this.weatherDataSerWCoords
          .getWeatherDataWithCoords(locationCoords)
          .subscribe((data) => (this.dynamicBackgroundVal = data.weather_desc));
      }
    });
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
