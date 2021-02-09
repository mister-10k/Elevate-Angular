import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { UserService } from '../../providers/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required),
  });

  login() {
    if (!this.form.valid)
      return;
    
    const obs = this.userService.login(this.form.get('email').value, this.form.get('password').value);
    obs.pipe(take(1)).subscribe(token => {
      localStorage.setItem('jwtToken', token);
      this.router.navigate(['/employeeBenifits/Dashboard']);
    }, err => console.log(err));
  }
}
