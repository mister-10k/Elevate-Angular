import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Elevate';
  currentPath = '';

  currentPathSub: Subscription | undefined;

  constructor(private router: Router, private primengConfig: PrimeNGConfig) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.currentPathSub = this.router.events.pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe(event => {
         this.currentPath = event.url;
      });
  }
}
