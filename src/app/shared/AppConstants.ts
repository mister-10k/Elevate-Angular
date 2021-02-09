import { environment } from 'src/environments/environment';

/**
 * The AppConstants class contains application constants shared throughout application.
 */
export class AppConstants {
    public static readonly JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImN1b25nIiwiY29tcGFueUlkIjoxLCJleHAiOjE2MTUyMDA0OTd9.VZMdQKaDbUvfil5nDGeVzmraf65dvWaBu7Qr6xYzVbg';
    public static readonly userUrl = environment.apiUrl + 'user/';
    public static readonly employeeUrl = environment.apiUrl + 'employee/';

}
