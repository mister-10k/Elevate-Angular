export interface IUser {
    Id: number;
    FirstName: string;
    LastName: string;
    Email?: string;
    UserTypeId?: number;
    CompanyId?: number;
    ComapnyName?: string;
    ComapnyDisplayName?: string;
    CreatedAt?: string;
    ModifiedAt?: string;
}