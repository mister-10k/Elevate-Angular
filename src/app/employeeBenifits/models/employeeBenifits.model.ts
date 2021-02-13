import { IListItem } from "src/app/shared/models/shared.model";
import { IUser } from "src/app/user/models/user.model";

export interface IDashboardStat {
    Name: string;
    Number: number;
    TextColor: string;
}

export interface IEmployee extends IUser {
    NumbeOfDependents: number;
    Dependents: Array<IEmployeeDependent>;
    CreatedAtText: string;
}

export interface IEmployeeDependent extends IUser {
    EmployeeId: number;
    RelationshipId: number;
    RelationshipName?: string;
    RelationshipDisplayName?: string;
    edit?: boolean;
    dependentCopy?: IEmployeeDependent;
    freshEntry?: boolean;
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

export interface IEmployeeFormMasterData {
    Relationships: Array<IListItem>;
}