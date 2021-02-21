import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RemoveDialog } from 'src/app/shared/components/remove-dialog/remove-dialog.component';
import { IEBEmployeeList, IEBEmployeeListRequestModel, IEmployeeModel, IEmployeeModelFormMasterData } from '../../models/employeeBenifits.model';
import { EmployeeDialog } from '../employee-dialog/employee-dialog.component';
import jwt_decode from "jwt-decode";
import { EmployeeBenifitsService } from '../../providers/employee-benifits.service';
import { take } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  @Input() employeeFormMasterData: IEmployeeModelFormMasterData;

  displayedColumns: string[] = ['Id', 'FirstName', 'LastName', 'Email', 'NumberOfDependents', 'CreatedAt', 'Actions'];
  dataSource = new MatTableDataSource<IEmployeeModel>();
  employee: IEmployeeModel;
  searchText: string = "";
  requestModel: IEBEmployeeListRequestModel = {
    CompanyId: 0,
    SearchText: this.searchText,
    SortBy: null,
    SortColumn: null,
    PageSize: 5,
    PageNumber: 0
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private dialog: MatDialog,
              private employeeBenifitsService: EmployeeBenifitsService,
              private snackBar: MatSnackBar,
              private router: Router) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.query('search');
  }

  query(action: string) {
    if (action == 'search' || action == 'sort')
          this.paginator.pageIndex = 0;

    this.setRequestModel();
    if (this.requestModel.CompanyId != 0) {
      const obs = this.employeeBenifitsService.getEmployeesForEBDashboard(this.requestModel);
      obs.pipe(take(1)).subscribe((data) => {
        if (data)
        {
          this.dataSource.data = data.Rows;
          this.paginator.length = data.TotalCount
        }
        // this.openSuccessSnackBar('Excel download complete.');
      }, err => console.log(err));
    } else {
      this.openSnackBar("Session expired.", "Log Out");
      this.router.navigate(['']);
    }
  }

  resetGrid() {
    this.searchText = null;
    this.sort.direction = '';
    this.paginator.pageSize = 5;
    this.query('search');
  }

  setRequestModel() {
    const jwt = localStorage.getItem('jwtToken');

    if (jwt) {
      const jwtDecoded = jwt_decode(jwt) as any;
      this.requestModel.CompanyId = jwtDecoded.companyId;
      this.requestModel.SearchText = this.searchText;
      if (this.sort.direction == '') { // default sort order
        this.requestModel.SortBy = 'asc';
        this.requestModel.SortColumn = 'Id';
      } else {
        this.requestModel.SortBy = this.sort.direction;
        this.requestModel.SortColumn = this.sort.active ? this.sort.active : 'Id';
      }
      this.requestModel.PageSize = this.paginator.pageSize;
      this.requestModel.PageNumber = this.paginator.pageIndex;
    } else {
      this.requestModel.CompanyId = 0;
    } 
  }

  openRemoveDialog(employeeId: number): void {
    const dialogRef = this.dialog.open(RemoveDialog, {
      data: {message: 'Are you sure you want to delete this employee?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.deleteEmployee(employeeId);
    });
  }

  openEmployeeDialog(mode: string, employee? :IEmployeeModel) {
    const dialogRef = this.dialog.open(EmployeeDialog, {
      width: '1036px',
      disableClose: mode != 'readOnly' ? true : false,
      data: { viewMode: mode, employee: employee, masterData: this.employeeFormMasterData}
    });

    dialogRef.afterClosed().subscribe(result => {
        if (result.save) {
          if (result.createOrUpdate == 'create') {
            this.createEmployee(result.employee);
          } else {
            this.updateEmployee(result.employee);
          }
        } else {
          let index = this.dataSource.data.findIndex(x => x.Id == employee.Id);
          if (index > -1)
            this.dataSource.data.splice(index,1,employee);
        }
    });
  }

  createEmployee(employee: IEmployeeModel) {
    const obs = this.employeeBenifitsService.createEmployee(employee);
    obs.pipe(take(1)).subscribe((addedEmployee) => {
      if (addedEmployee) {
        this.employeeBenifitsService.reloadDashboard();
        this.openSnackBar("Create employee successful.", "Create");
        this.resetGrid();
      } else {
        this.openSnackBar("Failed to create employee.", "Create");
      }      
    }, err => this.openSnackBar("Failed to create employee.", "Create"))
  }

  updateEmployee(employee: IEmployeeModel) {
    const obs = this.employeeBenifitsService.updateEmployeee(employee);
    obs.pipe(take(1)).subscribe((updatedEmployee) => {
      if (updatedEmployee) {
        this.employeeBenifitsService.reloadDashboard();
        this.openSnackBar("Update employee successful.", "Update");
        this.resetGrid();
      } else {
        this.openSnackBar("Failed to update employee.", "Update");
      }  
    }, err => this.openSnackBar("Failed to update employee.", "Update"))
  }

  deleteEmployee(employeeId: number) {
    const obs = this.employeeBenifitsService.deleteEmployee(employeeId);
    obs.pipe(take(1)).subscribe((deletedEmployee) => {
      if (deletedEmployee) {
        this.employeeBenifitsService.reloadDashboard();
        this.openSnackBar("Delete employee successful.", "Delete");
        this.resetGrid();
      } else {
        this.openSnackBar("Failed to delete employee.", "Delete");
      }
    }, err => this.openSnackBar("Failed to delete employee.", "Delete"))
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      panelClass: ['elevate-snackbar'],
      duration: 5000,
    });
  }

}
