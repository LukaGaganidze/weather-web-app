import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MobileNavService {
  menuStateVer = false;
  menuState = new BehaviorSubject<boolean>(this.menuStateVer);

  constructor() {}

  toggleMenu() {
    this.menuStateVer = !this.menuStateVer;
    this.menuState.next(this.menuStateVer);
  }
}
