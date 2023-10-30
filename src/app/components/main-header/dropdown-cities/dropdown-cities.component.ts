import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dropdown-cities',
  templateUrl: './dropdown-cities.component.html',
  styleUrls: ['./dropdown-cities.component.scss'],
})
export class DropdownCitiesComponent {
  @Input('cities') cities: string[] = [];
  @Input('activeState') activeState: boolean = false;

  constructor(private router: Router) {}

  navigateToCity(city: string) {
    this.activeState = false;

    this.router.navigate(['city'], {
      queryParams: {
        city: city,
      },
    });
  }
}
