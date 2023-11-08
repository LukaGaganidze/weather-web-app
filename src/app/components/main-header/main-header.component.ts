import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WeatherDataCityInputService } from 'src/app/services/api/weather-data-city-input.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BookmarksService } from 'src/app/services/shared/bookmarks.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
})
export class MainHeaderComponent implements OnInit, OnDestroy {
  // for bookmarks
  citiest: string[] = [];
  bookmarkEmpty = true;
  bokkmarkIsOpen = false;

  inputForm!: FormGroup;
  @ViewChild('inputElement') inputElement!: ElementRef;

  // error case
  inputError = false;
  errorMessige = '';

  // CITIES DPOPDOWN MENY STATE AND DATA
  georgianCitiesActive: boolean = false;
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
  worldwideCitiesActive: boolean = false;
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

  // subsciptions
  inputSubscription!: Subscription;

  constructor(
    private bookmarksSer: BookmarksService,
    private cityWeatherSer: WeatherDataCityInputService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.bookmarksSer.getCities();

    this.bookmarksSer.bookmarkedCitiesBehaviourSub.subscribe((data) => {
      this.citiest = data;
      if (data.length < 1) {
        this.bookmarkEmpty = false;
      } else {
        this.bookmarkEmpty = true;
      }
    });

    this.inputForm = new FormGroup({
      cityInput: new FormControl(null),
    });
  }

  submitInput() {
    if (this.inputForm.valid) {
      const countryInput: string = this.inputForm.value.cityInput;

      if (this.includesNumbers(countryInput)) {
        this.inputError = true;
        setTimeout(() => {
          this.inputError = false;
        }, 2000);
        this.inputForm.reset();
        return;
      }

      this.inputSubscription = this.cityWeatherSer
        .getWeatherDataWithInput(countryInput)
        .subscribe(
          (data) => {
            if (data) {
              this.router.navigate(['city'], {
                queryParams: {
                  city: countryInput,
                },
              });
            }
            this.inputForm.reset();
            this.inputElement.nativeElement.blur();
          },
          (err) => {
            this.inputError = true;
            this.errorMessige = err.error.message;
            setTimeout(() => {
              this.inputError = false;
            }, 2000);
            this.inputForm.reset();
          }
        );
    }
  }

  georgianCitiesStateContol(state: boolean) {
    this.georgianCitiesActive = state;
  }
  worldwideCitiesStateContol(state: boolean) {
    this.worldwideCitiesActive = state;
  }

  toggleDropdown(): void {
    this.bokkmarkIsOpen = !this.bokkmarkIsOpen;
  }
  closeDopDown() {
    this.bokkmarkIsOpen = false;
  }
  closeDropdownDelay() {
    setTimeout(() => {
      this.bokkmarkIsOpen = false;
    }, 500);
  }

  navigateToSavedCity(city: string) {
    this.router.navigate(['city'], {
      queryParams: {
        city: city,
      },
    });
    this.bokkmarkIsOpen = false;
  }

  ngOnDestroy(): void {
    this.inputSubscription.unsubscribe();
  }

  private includesNumbers(input: string): boolean {
    const regex = /\d/; // Regular expression to match any digit (0-9)
    return regex.test(input);
  }
}
