export interface IUser {
    Id: number;
    FirstName: string;
    LastName: string;
    Email?: string;
    UserTypeId?: number;
    CompanyId?: number;
    CreatedAt?: string;
    ModifiedAt?: string;
}