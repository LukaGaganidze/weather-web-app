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

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
})
export class MainHeaderComponent implements OnInit, OnDestroy {
  // colorControl = new FormControl('primary' as ThemePalette);
  inputForm!: FormGroup;
  @ViewChild('inputElement') inputElement!: ElementRef;

  // error case
  inputError = false;
  errorMessige = '';

  // subsciptions
  inputSubscription!: Subscription;

  constructor(
    private cityWeatherSer: WeatherDataCityInputService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.inputForm = new FormGroup({
      cityInput: new FormControl(null),
    });
  }

  submitInput() {
    if (this.inputForm.valid) {
      const countryInput: string = this.inputForm.value.cityInput;
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

  ngOnDestroy(): void {
    this.inputSubscription.unsubscribe();
  }
}
