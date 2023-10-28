import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  LatLngObj,
  WeatherDataForFiveDaysFromServer,
  WeatherDataForFiveDaysFromServerFiltered,
} from './weather-data-types';
import { environment } from 'src/environments/environment';
import { filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherFiveDayServiceService {
  constructor(private http: HttpClient) {}

  // RECIEVES COORDS AND RETURNS DATA FOR 5 DAYS FOR THE LOCATION
  getWeatherDataForFivedays(coords: LatLngObj) {
    return this.http
      .get<WeatherDataForFiveDaysFromServer>(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${coords.lat}&lon=${coords.lng}&appid=${environment.apiKey}&units=metric`
      )
      .pipe(
        filter((data: WeatherDataForFiveDaysFromServer) => {
          return data.list.length > 0;
        }),
        map((data): WeatherDataForFiveDaysFromServerFiltered[] => {
          return data.list.map((listData) => {
            const clouds = listData.clouds.all + '%';

            // day of the week
            const daysOfWeek = [
              'Sunday',
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
            ];
            const dayTimestamp = listData.dt_txt;
            const day = daysOfWeek[new Date(dayTimestamp).getDay()];

            const dateString = dayTimestamp;
            const parts = dateString.split(' ');
            const timePart = parts[1];
            const hour: number = parseInt(timePart.split(':')[0], 10);

            // time
            const timeTimestamp = listData.dt;
            const time = this.convertUnixTimestampTime(timeTimestamp);

            const maxTemp = listData.main.temp_max.toFixed(1) + '°' + ' ' + 'C';
            const minTemp = listData.main.temp_min.toFixed(1) + '°' + ' ' + 'C';
            const weatherDesc = listData.weather[0].description;
            const weatherMain = listData.weather[0].main;
            const icon = `https://openweathermap.org/img/wn/${listData.weather[0].icon}@2x.png`;

            const fiveDayForecast: WeatherDataForFiveDaysFromServerFiltered = {
              clouds,
              day,
              maxTemp,
              minTemp,
              weatherDesc,
              weatherMain,
              icon,
              time,
            };

            return fiveDayForecast;
          });
        })
      );
  }

  // Function to convert Unix timestamp to normal time
  private convertUnixTimestampTime(timestamp: number): string {
    const date = new Date(timestamp * 1000);

    // Define options for date and time formatting
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };

    let formattedDate = date.toLocaleString('en-US', options);

    // Replace "at" with a space
    formattedDate = formattedDate.replace('at', '');

    return formattedDate;
  }
}
