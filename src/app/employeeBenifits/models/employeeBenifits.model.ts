import { IUser } from "src/app/user/models/user.model";

export interface IDashboardStat {
    Name: string;
    Number: number;
    TextColor: string;
}

export interface IEmployee extends IUser {
    Dependents: Array<IEmployeeDependent>
}

export interface IEmployeeDependent extends IUser {
    EmployeeId: number;
    RelationshipId: number;
    RelationshipName: string;
    RelationshipDisplayName: string;
}

export interface IEBEmployeeListRequestModel {
    CompanyId: number;
    SearchText: string;
    SortBy: string;
    SortColumn: string;
    PageSize: number;
    PageNumber: number
}

export interface IEBEmployeeList {
    Id: number;
    FirstName: string;
    LastName: string;
    Company: string;
    Dependents: number;
    CreatedAt: string;
    TotalCount: number;
}