import { Component, OnInit } from '@angular/core';
import { MobileNavService } from '../../mobile-nav-bar/mobile-nav.service';

@Component({
  selector: 'app-mobile-nav',
  templateUrl: './mobile-nav.component.html',
  styleUrls: ['./mobile-nav.component.scss'],
})
export class MobileNavComponent implements OnInit {
  constructor(private mobilenavSer: MobileNavService) {}

  ngOnInit(): void {
    this.mobilenavSer.menuState.subscribe((state) => {
      console.log(state);
    });
  }

  toggleMenu() {
    this.mobilenavSer.toggleMenu();
  }
}
