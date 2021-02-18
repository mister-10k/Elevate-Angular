import { IListItem } from "src/app/shared/models/shared.model";

export interface IUserModel {
    Id: number;
    FirstName: string;
    LastName: string;
    Email?: string;
    Password?: string;
    UserTypeId?: number;
    CompanyId?: number;
    ComapnyName?: string;
    ComapnyDisplayName?: string;
    CreatedAt?: string;
    ModifiedAt?: string;
}

export interface  ISignUpMasterDataModel{
    Companies: Array<IListItem>;
    UserTypes: Array<IListItem>;
}