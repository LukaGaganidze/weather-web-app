import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
