import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherDataCityInputService } from 'src/app/services/api/weather-data-city-input.service';
import { WeatherDataCityCoordsInterfaceFiltered } from 'src/app/services/api/weather-data-types';

@Component({
  selector: 'app-popul-city-item',
  templateUrl: './popul-city-item.component.html',
  styleUrls: ['./popul-city-item.component.scss'],
})
export class PopulCityItemComponent implements OnInit {
  @Input('cityName') city: string = '';

  cityData$!: Observable<WeatherDataCityCoordsInterfaceFiltered>;

  constructor(private weatherCityInputSer: WeatherDataCityInputService) {}

  ngOnInit(): void {
    this.cityData$ = this.weatherCityInputSer.getWeatherDataWithCoords(
      this.city
    );
  }
}
