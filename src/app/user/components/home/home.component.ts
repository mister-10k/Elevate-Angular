import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../../providers/user.service';


/**
 * The HomeComponent class is used for the bmd project's home page.
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  currentPath = '';
  currentPathSub: Subscription;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    if (this.userService.loggedIn)
      this.router.navigate(['/employeeBenifits/Dashboard']);
  }

  @HostListener('window:resize', ['$event']) onResize() {
  }

}
