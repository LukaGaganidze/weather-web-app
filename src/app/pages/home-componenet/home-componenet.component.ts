import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { WeatherDataCityInputService } from 'src/app/services/api/weather-data-city-input.service';

@Component({
  selector: 'app-home-componenet',
  templateUrl: './home-componenet.component.html',
  styleUrls: ['./home-componenet.component.scss'],
})
export class HomeComponenet implements OnInit, OnDestroy {
  inputForm!: FormGroup;
  @ViewChild('inputElement') inputElement!: ElementRef;

  textInput: string = '';

  // error case
  inputError = false;
  errorMessige = '';

  // subsciptions
  inputSubscription!: Subscription;
  constructor(
    private router: Router,
    private cityWeatherSer: WeatherDataCityInputService
  ) {}
  ngOnInit(): void {
    window.scrollTo(0, 0); // Scroll to the top of the page

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          if (position) {
            const queryParams = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            this.router.navigate(['/location'], { queryParams: queryParams });
          }
        },
        (error) => {
          this.router.navigate(['']);
        }
      );
    } else {
      this.router.navigate(['']);
    }

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

  private includesNumbers(input: string): boolean {
    const regex = /\d/; // Regular expression to match any digit (0-9)
    return regex.test(input);
  }
  ngOnDestroy(): void {
    if (this.inputSubscription) {
      this.inputSubscription.unsubscribe();
    }
  }
}
