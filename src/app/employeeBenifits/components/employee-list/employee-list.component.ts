import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RemoveDialog } from 'src/app/shared/components/remove-dialog/remove-dialog.component';
import { IEBEmployeeList, IEBEmployeeListRequestModel, IEmployee, IEmployeeFormMasterData } from '../../models/employeeBenifits.model';
import { EmployeeDialog } from '../employee-dialog/employee-dialog.component';
import jwt_decode from "jwt-decode";
import { EmployeeBenifitsService } from '../../providers/employee-benifits.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  @Input() employeeFormMasterData: IEmployeeFormMasterData;

  displayedColumns: string[] = ['Id', 'FirstName', 'LastName', 'Email', 'NumberOfDependents', 'CreatedAt', 'Actions'];
  dataSource = new MatTableDataSource<IEmployee>();
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
    obs.pipe(take(1)).subscribe((data) => {
      if (data)
      {
        this.dataSource.data = data.Rows;
        this.paginator.length = data.TotalCount
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

  createEmployee(employee: IEmployee) {
    const obs = this.employeeBenifitsService.createEmployee(employee);
    obs.pipe(take(1)).subscribe((addedEmployee) => {
      this.employeeBenifitsService.reloadDashboard();
      this.resetGrid()
    }, err => console.log(err))
  }

  updateEmployee(employee: IEmployee) {
    const obs = this.employeeBenifitsService.updateEmployeee(employee);
    obs.pipe(take(1)).subscribe((updatedEmployee) => {
      this.employeeBenifitsService.reloadDashboard();
      this.resetGrid()
    }, err => console.log(err))
  }

  deleteEmployee(employeeId: number) {
    const obs = this.employeeBenifitsService.deleteEmployee(employeeId);
    obs.pipe(take(1)).subscribe((deletedEmployee) => {
      this.employeeBenifitsService.reloadDashboard();
      this.resetGrid()
    }, err => console.log(err))
  }

}
