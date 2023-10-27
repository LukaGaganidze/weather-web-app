import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserLocationService {
  locationData = new BehaviorSubject<GeolocationPosition>({
    coords: {
      latitude: 0,
      longitude: 0,
      accuracy: 0,
      altitude: null,
      altitudeAccuracy: null,
      heading: null,
      speed: null,
    },
    timestamp: 0,
  });

  loactionAccesed = new BehaviorSubject<boolean>(false);

  constructor() {}

  getLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.loactionAccesed.next(true);
          this.locationData.next(position);
        },
        (error) => {
          this.loactionAccesed.next(false);
        }
      );
    } else {
      this.loactionAccesed.next(false);
    }
  }
}
