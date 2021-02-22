import { IListItem } from "src/app/shared/models/shared.model";
import { IUserModel } from "src/app/user/models/user.model";

export interface IDashboardStat {
    Name: string;
    Number: number;
    TextColor: string;
}

export interface IEmployeeModel extends IUserModel {
    NumbeOfDependents?: number;
    Dependents: Array<IEmployeeModelDependent>;
    CreatedAt: string;
}

export interface IEmployeeModelDependent extends IUserModel {
    EmployeeId: number;
    RelationshipId: number;
    Relationship?: string;
    edit?: boolean;
    dependentCopy?: IEmployeeModelDependent;
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

export interface IEmployeeModelFormMasterData {
    Relationships: Array<IListItem>;
}

export interface EBDashbaordStatsCardModel {
    Title: string;
    Color: string;
    Number: number;
    CurrencyType: string;
    IsCurrency: boolean;
}