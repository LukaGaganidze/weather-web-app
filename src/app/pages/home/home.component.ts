import { Component } from '@angular/core';
import { WeatherDataCityCoordsInterfaceFiltered } from '../../services/api/weather-data-types';
import { UserLocationService } from 'src/app/services/geolocation/user-location.service';
import { WeatherDataCityCoordsService } from 'src/app/services/api/weather-data-city-coords.service';
import { LatLngObj } from './home-types';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  mainData$!: Observable<WeatherDataCityCoordsInterfaceFiltered>;

  haveLocation = false;

  constructor(
    private locationSer: UserLocationService,
    private weatherDataSerWCoords: WeatherDataCityCoordsService
  ) {}

  ngOnInit(): void {
    // calling Geolocation function
    this.locationSer.getLocation();

    // subscribing to current latitude and longitude BSub
    this.locationSer.locationData.subscribe((coords) => {
      const locationCoords: LatLngObj = {
        lat: coords.coords.latitude,
        lng: coords.coords.longitude,
      };

      // calling weather API with received coords
      this.mainData$ =
        this.weatherDataSerWCoords.getWeatherDataWithCoords(locationCoords);
    });

    // storing if we have coords or not
    this.locationSer.loactionAccesed.subscribe(
      (status) => (this.haveLocation = status)
    );
  }
}
