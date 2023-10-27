import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityWeatherComponent } from './pages/city-weather/city-weather.component';
import { HomeComponenet } from './pages/home-componenet/home-componenet.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponenet,
  },
  {
    path: 'location',
    component: CityWeatherComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
