import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookmarksService {
  bookmarkedCitiesBehaviourSub = new BehaviorSubject<string[]>([]);

  constructor() {}

  getCities(): string[] {
    const citiesFromLocalStorage = localStorage.getItem('cities');
    this.bookmarkedCitiesBehaviourSub.next(
      citiesFromLocalStorage ? JSON.parse(citiesFromLocalStorage) : []
    );
    return citiesFromLocalStorage ? JSON.parse(citiesFromLocalStorage) : [];
  }

  addCity(city: string) {
    let cities = this.getCities();

    if (cities.includes(city)) {
      cities = cities.filter((arrCity) => arrCity !== city);
    } else {
      cities.push(city);
    }
    localStorage.setItem('cities', JSON.stringify(cities));
  }
}
