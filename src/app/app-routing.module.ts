import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityWeatherInputComponent } from './pages/city-weather-input/city-weather-input.component';
import { CityWeatherMainComponenet } from './pages/city-weather/city-weather-main.componenet';

import { HomeComponenet } from './pages/home-componenet/home-componenet.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponenet,
  },
  {
    path: 'location',
    component: CityWeatherMainComponenet,
  },
  {
    path: 'city',
    component: CityWeatherInputComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
