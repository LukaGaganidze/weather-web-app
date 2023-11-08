import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MobileNavService } from '../mobile-nav.service';

@Component({
  selector: 'app-cities-fropdown',
  templateUrl: './cities-fropdown.component.html',
  styleUrls: ['./cities-fropdown.component.scss'],
})
export class CitiesFropdownComponent implements OnInit {
  cities: string[] = [];
  listState = false;
  noCitiesFound = true;

  constructor(private movbileSer: MobileNavService, private router: Router) {}

  ngOnInit(): void {
    this.movbileSer.citiesList.subscribe((cities: string[]) => {
      this.cities = cities;

      // if(cities)
    });

    this.movbileSer.citiesListActiveState.subscribe((state) => {
      this.listState = state;
    });
  }

  navigateToCity(city: string) {
    this.router.navigate(['city'], {
      queryParams: {
        city: city,
      },
    });
    this.movbileSer.closeMenu();
  }

  closeList() {
    this.movbileSer.closeCitiesDropDown();
  }
}
