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
    RelationshipId: number;
    RelationshipName: string;
    RelationshipDisplayName: string;
}