import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, OnInit, Query, QueryList, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatRow, MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { TimePeriod } from '../../constants/employeeBenifits';
import { IEmployeeModel, IEmployeeModelDependent, IEmployeeModelFormMasterData } from '../../models/employeeBenifits.model';
import { EmployeeBenifitsService } from '../../providers/employee-benifits.service';
import jwt_decode from "jwt-decode";
import { SelectErrorStateMatcher } from 'src/app/shared/errorStateMatchers/SelectErrorStateMatcher';
import { UserService } from 'src/app/user/providers/user.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-employee-dialog',
  templateUrl: './employee-dialog.component.html',
  styleUrls: ['./employee-dialog.component.scss']
})
export class EmployeeDialog implements OnInit, AfterViewInit {

  form: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required])
  });
  depndentsColumns: string[] = ['FirstName', 'LastName', 'Relationship', 'Actions'];
  dependentsDataSource = new MatTableDataSource<IEmployeeModelDependent>();
  readOnly: boolean;
  firstNameSub: Subscription;
  viewMode: string;
  employee: IEmployeeModel;
  employeeBackup: IEmployeeModel;
  masterData: IEmployeeModelFormMasterData;
  newDependent: IEmployeeModelDependent;
  matcher = new SelectErrorStateMatcher();
  emailSubscription: Subscription;

  @ViewChild('employeeDependentsForm', { static: true }) employeeDependentsForm: NgForm;

  constructor(private dialogRef: MatDialogRef<EmployeeDialog>,
              @Inject(MAT_DIALOG_DATA) public data: { viewMode: string, employee: IEmployeeModel, masterData: IEmployeeModelFormMasterData },
              private userService: UserService,
              private employeeBenifitsService: EmployeeBenifitsService) { 
      if (!data.employee) {
        let jwt = localStorage.getItem('jwtToken');
        let jwtDecoded = { companyId: 0 };
        if (jwt) {
          jwtDecoded = jwt_decode(jwt) as any;
        }
        
        this.employee = {
          Id: 0,
          FirstName: '',
          LastName: '',
          CompanyId: jwtDecoded.companyId,
          NumbeOfDependents: 0,
          Dependents: [],
          CreatedAt: '--',
        }
      } else {
        this.employee = data.employee;
        this.employeeBackup = {...this.employee};
      }
      this.viewMode = data.viewMode;
      this.masterData = data.masterData;
    }

  ngOnInit(): void {
    this.setEmailSubscription();
    if (this.viewMode == 'readOnly') {
      this.readOnly = true;
      this.disableEmployeeFormControls();
    }
    this.fillEmployeeForm();
    this.dependentsDataSource.data = this.employee.Dependents;

    if (!this.masterData)
      this.masterData = { Relationships: [] };
  }

  ngAfterViewInit() {
  }

  private fillEmployee() { // only input fields
      this.employee.FirstName = this.form.get('firstName').value;
      this.employee.LastName = this.form.get('lastName').value;
      this.employee.Email = this.form.get('email').value;
  }

  private fillEmployeeForm() {
    this.form.get('firstName').setValue(this.employee.FirstName);
    this.form.get('lastName').setValue(this.employee.LastName);
    this.form.get('email').setValue(this.employee.Email);
    // this.form.get('comapny').setValue(this.employeeDialogData.employee.CompanyId);
  }

  private disableEmployeeFormControls() {
    this.form.controls['firstName'].disable();
    this.form.controls['lastName'].disable();
    this.form.controls['firstName'].disable();
    this.form.controls['email'].disable();
  }

  addNewDependent($event) {
    $event.preventDefault();
    this.initNewDependent();
    this.employee.Dependents.push(this.newDependent);
    this.dependentsDataSource.data = this.employee.Dependents;
  }

  saveDependent(element: IEmployeeModelDependent, row: number) {
    if(!this.validateEmployeeDpendentRow(row)) 
      return;

    element.edit = false;
    element.freshEntry = false;
    this.employee.Dependents[row] = element;
    this.dependentsDataSource.data = this.employee.Dependents;
  }

  private validateEmployeeDpendentRow(row: number) {
    let valid = true;

    if (this.employeeDependentsForm.form.controls[row +'-firstName'].value == '') {
      this.employeeDependentsForm.form.controls[row +'-firstName'].markAsTouched();
      valid = false;
    }
    if (this.employeeDependentsForm.form.controls[row +'-lastName'].value == '') {
      this.employeeDependentsForm.form.controls[row +'-lastName'].markAsTouched();
      valid = false;
    }
    if (this.employeeDependentsForm.form.controls[row +'-relationship'].value == 0) {
      this.employeeDependentsForm.form.controls[row +'-relationship'].markAsTouched();
      valid = false;
    }

    return valid;
  }

  editDependent(element: IEmployeeModelDependent) {
    element.dependentCopy = {...element};
    element.edit = true;
  }

  deleteDependent(row: number) {
    this.employee.Dependents.splice(row,1);
    this.dependentsDataSource.data = this.employee.Dependents;
  }

  cancelDependent(element: IEmployeeModelDependent, row: number) {
    if (element.freshEntry) {
      this.employee.Dependents.splice(row,1);
    } else {
      this.employee.Dependents[row] = this.employee.Dependents[row].dependentCopy;
      this.employee.Dependents[row].edit = false;
    }
    this.dependentsDataSource.data = this.employee.Dependents;
  }

  onRelationshipSelect($event, element: IEmployeeModelDependent) {
    let relationship = this.masterData.Relationships.find(x => x.Value == $event.value);
    if (relationship)
      element.Relationship = relationship.Text
  }

  compareWith(v1: any, v2: any): boolean {
    return v1 && v2 ? v1 == v2 : false;
  }

  initNewDependent() {
    this.newDependent = {
      Id: 0,
      EmployeeId: this.employee.Id,
      FirstName: '',
      LastName: '',
      RelationshipId: 0,
      edit: true,
      freshEntry: true
    }
  }

  getEmployeeDeductionCost(period: string): number {
    this.fillEmployee();

    let result = 0;
    switch(period)
    {
      case TimePeriod.BiWeekly:
        result =  this.employeeBenifitsService.getEmployeeDeductionCost(this.employee)/26;
        break;
      case TimePeriod.Month:
        result =  this.employeeBenifitsService.getEmployeeDeductionCost(this.employee)/12;
        break;
      default: 
        return this.employeeBenifitsService.getEmployeeDeductionCost(this.employee);
    }

    return result;
  }

  setEmailSubscription() {
    const obs = this.form.get('email').valueChanges;
    this.emailSubscription = obs.subscribe(val => {
      if (this.form.get('email').valid && this.form.get('email').value != this.employeeBackup.Email) {
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

  getEmployeeFormControlErrorMsg(controlName: string) {
    return this.form.get(controlName).hasError('required') ? 'You must enter a value.' :
           this.form.get(controlName).hasError('emailTaken') ? 'Email is already taken.' :                   
           this.form.get(controlName).hasError('email') ? 'Email is not valid.': '';
  }

  onCancel($event) {
    $event.preventDefault();
    this.dialogRef.close({ employee: this.employeeBackup, save: false });
  }

  onSave($event) {
    if (!this.form.valid || !this.employeeDependentsForm.valid)
      return;

    this.fillEmployee();    
    this.dialogRef.close({ employee: this.employee, save: true, createOrUpdate: this.employee.Id == 0 ? 'create' : 'update' });
  }

}
