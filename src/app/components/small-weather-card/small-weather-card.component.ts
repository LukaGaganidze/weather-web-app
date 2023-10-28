import { Component, Input, OnInit } from '@angular/core';
import { WeatherDataForFiveDaysFromServerFiltered } from 'src/app/services/api/weather-data-types';

interface WeatherBackgr {
  weather: string;
  dayOrNight: string;
}

@Component({
  selector: 'app-small-weather-card',
  templateUrl: './small-weather-card.component.html',
  styleUrls: ['./small-weather-card.component.scss'],
})
export class SmallWeatherCardComponent implements OnInit {
  @Input() cardData!: WeatherDataForFiveDaysFromServerFiltered;

  url = '';

  ngOnInit() {
    this.getBackgroundImage();
  }

  getBackgroundImage() {
    let dayOrNightIndicator = 'day';
    let imageIndicator = 'wild-card';

    const myWeatherPics = ['clear', 'clouds', 'rain', 'snow', 'thunderstorm'];
    const conditionForImages = myWeatherPics.filter(
      (str) => str === 'this.cardData.weatherMain.toLocaleLowerCase()'
    );

    if (conditionForImages)
      imageIndicator = this.cardData.weatherMain.toLocaleLowerCase();

    if (this.cardData.time === '01:00 AM') {
      dayOrNightIndicator = 'night';
    }
    if (this.cardData.time === '04:00 AM') {
      dayOrNightIndicator = 'night';
    }
    if (this.cardData.time === '07:00 PM') {
      dayOrNightIndicator = 'night';
    }
    if (this.cardData.time === '10:00 PM') {
      dayOrNightIndicator = 'night';
    }

    const imageUrl = `../../../../../assets/pages/city-weather/weather-small/${imageIndicator}-${dayOrNightIndicator}.jpg`;
    this.url = imageUrl;
  }
}
