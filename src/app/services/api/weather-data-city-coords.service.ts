import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

import { LatLngObj } from 'src/app/pages/home/home-types';
import { filter, map } from 'rxjs';

import { WeatherDataCityCoordsInterface } from './weather-data-types';
import { WeatherDataCityCoordsInterfaceFiltered } from './weather-data-types';

@Injectable({
  providedIn: 'root',
})
export class WeatherDataCityCoordsService {
  constructor(private http: HttpClient) {}

  getWeatherDataWithCoords(coords: LatLngObj) {
    return this.http
      .get<WeatherDataCityCoordsInterface>(
        `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lng}&appid=${environment.apiKey}&units=metric`
      )
      .pipe(
        filter((data) => {
          console.log(data);
          return data.sys.country !== undefined;
        }),
        map((data) => {
          const currentDateNTime = this.convertUnixTimestampDateNTime(data.dt);
          const sunRise = this.convertUnixTimestampTime(data.sys.sunrise);
          const sunSet = this.convertUnixTimestampTime(data.sys.sunset);

          const tempNum = data.main.temp.toFixed(1);
          const degree = tempNum + '°' + ' ' + 'C';
          const feelsLikeDeg = data.main.feels_like + '°' + ' ' + 'C';
          const windSpeed = data.wind.speed + 'km/h';
          const windDeg = data.wind.deg + '°' + ' ' + 'deg';
          const cloudIndicator = Object.values(data.clouds)[0];
          const clouds = cloudIndicator + '%';
          const humadity = data.main.humidity + '%';
          const pressure = data.main.pressure + 'hpa';
          const visibility = data.visibility + 'm';

          let countryName: any = data.sys.country;

          if (data.sys.country) {
            countryName = new Intl.DisplayNames(['en'], {
              type: 'region',
            }).of(data.sys.country);
          }

          const filteredData: WeatherDataCityCoordsInterfaceFiltered = {
            temp: degree,
            weather: data.weather[0].description,
            feels_like: feelsLikeDeg,
            weather_desc: data.weather[0].main,
            icon_url: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,

            date_n_time: currentDateNTime,
            id: data.id,

            wind_speed: windSpeed,
            wind_deg: windDeg,
            clouds: clouds,
            cloudIndicator: cloudIndicator,

            humadity: humadity,
            pressure: pressure,
            visibility: visibility,

            country: countryName,

            sun_rise: sunRise,
            sun_set: sunSet,
            city: data.name,
          };

          return filteredData;
        })
      );
  }

  // Function to convert Unix timestamp to normal time and date
  private convertUnixTimestampDateNTime(timestamp: number): string {
    const date = new Date(timestamp * 1000);

    // Define options for date and time formatting
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
      timeZoneName: 'short',
    };

    let formattedDate = date.toLocaleString('en-US', options);

    // Replace "at" with a space
    formattedDate = formattedDate.replace('at', '');

    return formattedDate;
  }

  // Function to convert Unix timestamp to normal time
  private convertUnixTimestampTime(timestamp: number): string {
    const date = new Date(timestamp * 1000);

    // Define options for date and time formatting
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    };

    let formattedDate = date.toLocaleString('en-US', options);

    // Replace "at" with a space
    formattedDate = formattedDate.replace('at', '');

    return formattedDate;
  }
}
