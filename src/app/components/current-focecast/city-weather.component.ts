import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { WeatherDataCityCoordsInterfaceFiltered } from '../../services/api/weather-data-types';

import { Observable, Subscription } from 'rxjs';

import { BookmarksService } from 'src/app/services/shared/bookmarks.service';

@Component({
  selector: 'city-weather-current',
  templateUrl: './city-weather.component.html',
  styleUrls: ['./city-weather.component.scss'],
})
export class CityWeatherComponent implements OnInit, OnDestroy, OnChanges {
  @Input('weatherData')
  mainData$!: Observable<WeatherDataCityCoordsInterfaceFiltered>;
  @Input('dynamicBackGr') dynamicBackgroundVal = '';

  // for bookmarks
  cities: string[] = [];
  cityAdded = false;
  currentCity = '';

  //
  citySubscription!: Subscription;

  constructor(private bookmarksSer: BookmarksService) {
    this.cities = this.bookmarksSer.getCities();
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.citySubscription = this.mainData$.subscribe((data) => {
      if (this.cities.includes(data.city)) {
        this.cityAdded = true;
      } else {
        this.cityAdded = false;
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

  addToBookmarks(city: string) {
    this.bookmarksSer.addCity(city);
    this.cities = this.bookmarksSer.getCities();
    this.cityAdded = !this.cityAdded;
  }

  ngOnDestroy(): void {
    this.citySubscription.unsubscribe();
  }
}
