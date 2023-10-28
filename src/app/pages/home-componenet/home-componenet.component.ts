import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-componenet',
  templateUrl: './home-componenet.component.html',
  styleUrls: ['./home-componenet.component.scss'],
})
export class HomeComponenet implements OnInit {
  constructor(private router: Router) {}
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
  }
}
