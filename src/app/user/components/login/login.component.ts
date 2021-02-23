import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  constructor(private userService: UserService,
              private router: Router,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) { }

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
        this.openSnackBar("login success.", "login")
        this.router.navigate(['/employeeBenifits/Dashboard']);
      }
    }, err => {
      console.log(err);
      if (err && err.status == 401) {
        this.openSnackBar("Invalid login credentials. Please try again.", "Login")
      } else {
        this.openSnackBar("Login failed.", "Login")
      }      
    });
  }

  getLoginFormControlErrorMsg(controlName: string) {
    return this.form.get(controlName).hasError('required') ? 'You must enter a value.' :               
           this.form.get(controlName).hasError('email') ? 'Email is not valid.': '';
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

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      panelClass: ['elevate-snackbar'],
      duration: 5000,
    });
  }
}
