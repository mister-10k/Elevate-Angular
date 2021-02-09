import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-remove-dialog',
  templateUrl: './remove-dialog.component.html',
  styleUrls: ['./remove-dialog.component.scss']
})
export class RemoveDialog implements OnInit {

  removeDialogData: {message: string};

  constructor(
    private dialogRef: MatDialogRef<RemoveDialog>,
    @Inject(MAT_DIALOG_DATA) public data: {message: string}) { 
    this.removeDialogData = data;
  }


  ngOnInit(): void {
  }

  onCancelClick() {
    this.dialogRef.close(false);
  }

  onDeleteClick() {
    this.dialogRef.close(true);
  }


}
