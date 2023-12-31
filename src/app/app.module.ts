import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { FooterComponent } from './components/footer/footer.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModuleModule } from './material/material-module.module';
import { CityWeatherComponent } from './components/current-focecast/city-weather.component';
import { HomeComponenet } from './pages/home-componenet/home-componenet.component';
import { PopularCitiesComponent } from './components/popular-cities/popular-cities.component';
import { FiveDayForecastComponent } from './components/five-day-forecast/five-day-forecast.component';
import { CityWeatherMainComponenet } from './pages/city-weather/city-weather-main.componenet';
import { SmallWeatherCardComponent } from './components/small-weather-card/small-weather-card.component';
import { PopulCityItemComponent } from './components/popular-cities/popul-city-item/popul-city-item.component';
import { CityWeatherInputComponent } from './pages/city-weather-input/city-weather-input.component';
import { DropdownCitiesComponent } from './components/main-header/dropdown-cities/dropdown-cities.component';
import { MobileNavComponent } from './components/main-header/mobile-nav/mobile-nav.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MobileNavBarComponent } from './components/mobile-nav-bar/mobile-nav-bar.component';
import { CitiesFropdownComponent } from './components/mobile-nav-bar/cities-fropdown/cities-fropdown.component';

@NgModule({
  declarations: [
    AppComponent,
    MainHeaderComponent,
    FooterComponent,
    HomeComponenet,
    CityWeatherComponent,
    PopularCitiesComponent,
    FiveDayForecastComponent,
    CityWeatherMainComponenet,
    SmallWeatherCardComponent,
    PopulCityItemComponent,
    CityWeatherInputComponent,
    DropdownCitiesComponent,
    MobileNavComponent,
    MobileNavBarComponent,
    CitiesFropdownComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModuleModule,
    MatToolbarModule,

    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
