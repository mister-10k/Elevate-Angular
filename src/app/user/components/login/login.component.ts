import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { ISignUpMasterDataModel } from '../../models/user.model';
import { UserService } from '../../providers/user.service';
import { SignUpDialog } from '../sign-up/sign-up-dialog.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required),
  });
  signUpMasterData: ISignUpMasterDataModel;

  constructor(private userService: UserService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getSignUpMasterData();
  }

  login() {
    if (!this.form.valid)
      return;
    
    const obs = this.userService.login(this.form.get('email').value,  this.form.get('password').value);
    obs.pipe(take(1)).subscribe(token => {
      if (token) {
        localStorage.setItem('jwtToken', token);
        this.router.navigate(['/employeeBenifits/Dashboard']);
      }
    }, err => console.log(err));
  }

  getSignUpMasterData() {
    const obs = this.userService.getSignUpMasterData();
    obs.pipe(take(1)).subscribe(data => {
      this.signUpMasterData = data;
    }, err => console.log(err));
  }

  openSignUpDialog($event) {
    $event.preventDefault();

    const dialogRef = this.dialog.open(SignUpDialog, {
      data: { masterData: this.signUpMasterData}
    });

    dialogRef.afterClosed().subscribe(result => {
        
    });
  }
}
