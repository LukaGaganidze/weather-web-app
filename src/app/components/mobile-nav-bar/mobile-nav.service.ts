import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BookmarksService } from 'src/app/services/shared/bookmarks.service';

@Injectable({
  providedIn: 'root',
})
export class MobileNavService {
  menuStateVer = false;
  menuState = new BehaviorSubject<boolean>(this.menuStateVer);

  // dropdown cities

  // CITIES DPOPDOWN MENY STATE AND DATA
  georgianCities: string[] = [
    'Tbilisi',
    'Kutaisi',
    'Batumi',
    'Rustavi',
    'Gori',
    'Zugdidi',
    'Poti',
    'Sukhumi',
    'Telavi',
    'Akhaltsikhe',
    'Ozurgeti',
    'Kobuleti',
    'Mtskheta',
    'Samtredia',
    'Kaspi',
    'Ochamchire',
    'Tkibuli',
    'Ambrolauri',
    'Khoni',
    'Lanchkhuti',
    // Add more cities as needed
  ];
  // CITIES DPOPDOWN MENY STATE AND DATA
  worldwideCities: string[] = [
    'New York',
    'Tokyo',
    'London',
    'Paris',
    'Los Angeles',
    'Sydney',
    'Hong Kong',
    'Dubai',
    'Rome',
    'Barcelona',
    'Bangkok',
    'Amsterdam',
    'San Francisco',
    'Istanbul',
    'Mumbai',
    'Rio de Janeiro',
    'Cape Town',
    'Toronto',
    'Berlin',
    'Singapore',
  ];

  citiesList = new BehaviorSubject<string[]>([]);
  citiesListActiveState = new BehaviorSubject<boolean>(false);

  constructor(private savedCityesSer: BookmarksService) {}

  toggleMenu() {
    this.menuStateVer = !this.menuStateVer;
    this.menuState.next(this.menuStateVer);
  }

  closeMenu() {
    this.menuStateVer = false;
    this.menuState.next(this.menuStateVer);

    this.citiesListActiveState.next(false);
  }

  citiesStaticDataManager(type: string) {
    if (!type) return;

    if (type === 'geo') {
      this.citiesList.next(this.georgianCities);
      this.citiesListActiveState.next(true);
    }

    if (type === 'wrld') {
      this.citiesList.next(this.worldwideCities);
      this.citiesListActiveState.next(true);
    }
    if (type === 'saved') {
      this.citiesList.next(this.savedCityesSer.getCities());
      this.citiesListActiveState.next(true);
    }
  }

  closeCitiesDropDown() {
    this.citiesListActiveState.next(false);
  }
}
