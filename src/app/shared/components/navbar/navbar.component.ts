import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { UserService } from 'src/app/user/providers/user.service';

/**
 * The NavbarComponent class is used for the bmd project's navigation bar.
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  logOut() {
    this.userService.logout();
    this.router.navigate(['']);
  }

  loggedIn(): boolean {
    return this.userService.loggedIn;
  }
}
