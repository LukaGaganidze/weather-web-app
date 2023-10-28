export interface LatLngObj {
  lat: number;
  lng: number;
}

// initial data from server
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
// filtered  and mapped data
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

// initial data from server
export interface WeatherDataForFiveDaysFromServer {
  city: {
    coord: { lat: number; lon: number };
    country: string;
    id: number;
    name: string;
    population: number;
    sunrise: number;
    sunset: number;
    timezone: number;
  };
  cnt: number;
  cod: string;
  list: {
    clouds: {
      all: number;
    };
    dt: number;
    dt_txt: string;
    main: {
      feels_like: number;
      grnd_level: number;
      humidity: number;
      pressure: number;
      sea_level: number;
      temp: number;
      temp_kf: number;
      temp_max: number;
      temp_min: number;
    };
    pop: number;
    sys: {
      pod: string;
    };
    weather: {
      description: string;
      icon: string;
      id: number;
      main: string;
    }[];

    wind: {
      deg: number;
      gust: number;
      speed: number;
    };
  }[];
}

export interface WeatherDataForFiveDaysFromServerFiltered {
  clouds: string;
  day: string;
  maxTemp: string;
  minTemp: string;
  weatherDesc: string;
  weatherMain: string;
  icon: string;
  time: string;
}
