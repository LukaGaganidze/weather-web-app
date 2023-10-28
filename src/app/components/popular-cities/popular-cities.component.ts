import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-popular-cities',
  templateUrl: './popular-cities.component.html',
  styleUrls: ['./popular-cities.component.scss'],
})
export class PopularCitiesComponent implements OnInit {
  cities = [
    'Tbilisi',
    'New York City',
    'London',
    'Paris',
    'Tokyo',
    'Beijing',
    'Los Angeles',
    'Berlin',
    'Rome',
    'Sydney',
    'Istanbul',
    'Dubai',
    'Bangkok',
    'Mumbai',
    'Moscow',
    'Rio de Janeiro',
    'Toronto',
    'Cairo',
    'Barcelona',
    'Seoul',
  ];

  constructor() {}

  ngOnInit(): void {}
}
