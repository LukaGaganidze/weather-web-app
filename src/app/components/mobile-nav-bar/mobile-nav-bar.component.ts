import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { WeatherDataCityInputService } from 'src/app/services/api/weather-data-city-input.service';
import { BookmarksService } from 'src/app/services/shared/bookmarks.service';
import { MobileNavService } from './mobile-nav.service';

@Component({
  selector: 'app-mobile-nav-bar',
  templateUrl: './mobile-nav-bar.component.html',
  styleUrls: ['./mobile-nav-bar.component.scss'],
})
export class MobileNavBarComponent implements OnInit {
  menuState = false;

  inputForm!: FormGroup;
  @ViewChild('inputElement') inputElement!: ElementRef;

  // error case
  inputError = false;
  errorMessige = '';

  inputSubscription!: Subscription;

  constructor(
    private mobileSer: MobileNavService,
    private bookmarksSer: BookmarksService,
    private cityWeatherSer: WeatherDataCityInputService,
    private router: Router
  ) {}

  ngOnInit() {
    this.mobileSer.menuState.subscribe((state) => {
      this.menuState = state;
    });

    this.inputForm = new FormGroup({
      cityInput: new FormControl(null),
    });
  }

  closeMenu() {
    this.mobileSer.closeMenu();
  }

  submitInput() {
    if (this.inputForm.valid) {
      const countryInput: string = this.inputForm.value.cityInput;

      if (this.includesNumbers(countryInput)) {
        this.inputError = true;
        this.errorMessige = 'City Not Found';
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
            this.mobileSer.closeMenu();
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

  dropdownCities(type: string) {
    this.mobileSer.citiesStaticDataManager(type);
  }

  private includesNumbers(input: string): boolean {
    const regex = /\d/; // Regular expression to match any digit (0-9)
    return regex.test(input);
  }
}
