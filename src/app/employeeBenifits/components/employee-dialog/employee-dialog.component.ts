import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { IEmployee, IEmployeeDependent } from '../../models/employeeBenifits.model';

@Component({
  selector: 'app-employee-dialog',
  templateUrl: './employee-dialog.component.html',
  styleUrls: ['./employee-dialog.component.scss']
})
export class EmployeeDialog implements OnInit {

  employeeDialogData: { mode: string, employee: IEmployee };
  form: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    company: new FormControl('', [Validators.required]),
    dateJoined: new FormControl('', Validators.required)
  });
  depndentsColumns: string[] = ['firstName', 'lastName', 'relationship', 'actions'];
  dataSource = new MatTableDataSource<IEmployeeDependent>(EMPLOYEE_DEPENDENT_DATA);

  constructor(private dialogRef: MatDialogRef<EmployeeDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { mode: string, employee: IEmployee }) { 
      this.employeeDialogData = data;
    }

  ngOnInit(): void {
  }

  onCancelClick() {
    this.dialogRef.close(false);
  }

  onDeleteClick() {
    this.dialogRef.close(true);
  }

  save() {

  }

}

const EMPLOYEE_DEPENDENT_DATA: IEmployeeDependent[] = [
  {Id: 1,  EmployeeId: 0, FirstName: 'Kwabena', LastName: 'Ohemeng', RelationshipId: 1, RelationshipName:'hi', RelationshipDisplayName: 'hi'},
];
