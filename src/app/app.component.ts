import { Component, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { PrimeNGConfig } from 'primeng/api';
import { UserService } from './user/providers/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'Elevate';
  currentPath = '';

  currentPathSub: Subscription;
  sessionExpiredSub: Subscription;

  constructor(private router: Router, private primengConfig: PrimeNGConfig, private userService: UserService,  private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.setCurrentPathSub();
    this.setSessionExpiredSub();
  }

  ngOnDestroy() {
    if (this.currentPathSub) this.currentPathSub.unsubscribe();
    if (this.sessionExpiredSub) this.sessionExpiredSub.unsubscribe();
  }

  setCurrentPathSub() {
    this.currentPathSub = this.router.events.pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe(event => {
         this.currentPath = event.url;
      });
  }

  setSessionExpiredSub() {
    this.sessionExpiredSub = this.userService.sessionExpired$.subscribe(sessionExpired => {
      if (sessionExpired) {
        this.openSnackBar("Session expired.", "Log Out");
        this.router.navigate(['']);
      }
    }, err => console.log(err));
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      panelClass: ['elevate-snackbar'],
      duration: 5000,
    });
  }
}
