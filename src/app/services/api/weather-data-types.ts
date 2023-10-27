export interface WeatherDataCityCoordsInterface {
  base: string;
  clouds: { all: number };
  cod: number;
  coords: {
    lon: number;
    lat: number;
  };
  dt: number;
  id: number;
  main: {
    feels_like: number;
    pressure: number;
    temp: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  name: string;

  wind: { speed: number; deg: number };

  sys: {
    country: string;
    id: number;
    sunrise: number;
    sunset: number;
    type: number;
  };
  timezone: number;
  visibility: number;

  weather: {
    description: string;
    icon: string;
    id: number;
    main: string;
  }[];
  speed: {
    deg: number;
    speed: number;
  };
}
export interface WeatherDataCityCoordsInterfaceFiltered {
  temp: string;
  feels_like: string;
  date_n_time: string;
  id: number;
  wind_speed: string;
  wind_deg: string;
  clouds: string;
  humadity: string;
  pressure: string;
  visibility: string;
  country: any;
  sun_rise: string;
  sun_set: string;
  cloudIndicator: number;
  weather: string;
  weather_desc: string;
  icon_url: string;
  city: string;
}
