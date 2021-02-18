import { environment } from 'src/environments/environment';

/**
 * The AppConstants class contains application constants shared throughout application.
 */
export class AppConstants {
    public static readonly userUrl = environment.apiUrl + 'user/';
    public static readonly employeeUrl = environment.apiUrl + 'employee/';

}
