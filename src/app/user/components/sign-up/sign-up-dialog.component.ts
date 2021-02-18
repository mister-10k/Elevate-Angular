import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { SelectErrorStateMatcher } from 'src/app/shared/errorStateMatchers/SelectErrorStateMatcher';
import { ISignUpMasterDataModel, IUserModel } from '../../models/user.model';
import { UserService } from '../../providers/user.service';

@Component({
  selector: 'app-employee-dialog',
  templateUrl: './sign-up-dialog.component.html',
  styleUrls: ['./sign-up-dialog.component.scss']
})
export class SignUpDialog implements OnInit {

  form: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required),
    company: new FormControl(null, Validators.required),
    userType: new FormControl(null, Validators.required)
  });
  masterData: ISignUpMasterDataModel;
  matcher = new SelectErrorStateMatcher();
  emailSubscription: Subscription;
  userModel: IUserModel = {
    Id: 0,
    FirstName: "",
    LastName: "",
  }

  constructor(private dialogRef: MatDialogRef<SignUpDialog>, private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: { masterData: ISignUpMasterDataModel }, private router: Router) { 
      if (!data || !data.masterData) {
        this.masterData = { Companies: [], UserTypes: [] };
      } else {
        this.masterData = data.masterData;
      }
    }

  ngOnInit(): void {
    this.setEmailSubscription();
  }

  signUp() {
    if (!this.form.valid)
      return;
  
    this.fillUserModel();

    const obs = this.userService.signUp(this.userModel);

    obs.pipe(take(1)).subscribe(token => {
      if (token) {
        localStorage.setItem('jwtToken', token);
        this.dialogRef.close(true);
        this.router.navigate(['/employeeBenifits/Dashboard']);
      }
    }, err => console.log(err));
  }

  fillUserModel() {
    this.userModel.FirstName = this.form.get('firstName').value;
    this.userModel.LastName = this.form.get('lastName').value;
    this.userModel.Email = this.form.get('email').value;
    this.userModel.Password = this.form.get('password').value;
    this.userModel.CompanyId = this.form.get('company').value;
    this.userModel.UserTypeId = this.form.get('userType').value;
  }

  setEmailSubscription() {
    const obs = this.form.get('email').valueChanges;
    this.emailSubscription = obs.subscribe(val => {
      if (this.form.get('email').valid) {
        const obs2 = this.userService.userAlreadyHasEmail(val);
        obs2.pipe(take(1)).subscribe((exists) => {
          let errors = this.form.get('email').errors;
          if (exists) {
            if (errors) {
              errors.emailTaken = true;
            } else {
              errors = { emailTaken: true }
            }
            this.form.get('email').setErrors(errors);
          } 
        }, err => console.log(err))
      }
    });
  }

  getSignUpFormControlErrorMsg(controlName: string) {
    return this.form.get(controlName).hasError('required') ? 'You must enter a value.' :
           this.form.get(controlName).hasError('emailTaken') ? 'Email is already taken.' :             
           this.form.get(controlName).hasError('email') ? 'Email is not valid.': '';
  }

  compareWith(v1: any, v2: any): boolean {
    return v1 && v2 ? v1 == v2 : false;
  }
}
