import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RemoveDialog } from 'src/app/shared/components/remove-dialog/remove-dialog.component';
import { IEBEmployeeList, IEBEmployeeListRequestModel, IEmployee } from '../../models/employeeBenifits.model';
import { EmployeeDialog } from '../employee-dialog/employee-dialog.component';
import jwt_decode from "jwt-decode";
import { EmployeeBenifitsService } from '../../providers/employee-benifits.service';
import { take } from 'rxjs/operators';
import { CdkRow } from '@angular/cdk/table';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  displayedColumns: string[] = ['Id', 'FirstName', 'LastName', 'Company', 'Dependents', 'CreatedAt', 'Actions'];
  dataSource = new MatTableDataSource<IEBEmployeeList>();
  employee: IEmployee;
  searchText: string = "";
  requestModel: IEBEmployeeListRequestModel = {
    CompanyId: 0,
    SearchText: this.searchText,
    SortBy: null,
    SortColumn: null,
    PageSize: 5,
    PageNumber: 0
  }
  resultsLength: number = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private dialog: MatDialog, private employeeBenifitsService: EmployeeBenifitsService) { }

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
    const obs = this.employeeBenifitsService.getEmployeesForEBDashboard(this.requestModel);
    obs.pipe(take(1)).subscribe((employees) => {
      if (employees)
      {
        this.dataSource.data = employees;
        this.paginator.length = employees.length > 0 ? employees[0].TotalCount : 0;
      }
      // this.openSuccessSnackBar('Excel download complete.');
    }, err => console.log(err));
  }

  resetGrid() {
    this.searchText = null;
    this.sort.direction = '';
    this.paginator.pageSize = 5;
    this.query('search');
  }

  deleteEmployee(employeeId: number) {
    const obs = this.employeeBenifitsService.deleteEmployee(employeeId);
    obs.pipe(take(1)).subscribe((deletedEmployee) => {
      this.resetGrid()
    }, err => console.log(err))
  }

  setRequestModel() {
    var jwtDecoded = jwt_decode(localStorage.getItem('jwtToken')) as any;
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

  openEmployeeDialog(mode: string, employee? :IEmployee) {
    const dialogRef = this.dialog.open(EmployeeDialog, {
      width: '1036px',
      data: { mode: mode, employee: employee}
    });

    dialogRef.afterClosed().subscribe(result => {
        console.log(result);
    });
  }
}
