export interface ITable {
    Rows: Array<any>;
    TotalCount: number;
}

export interface IListItem {
    Value: string;
    Text: string;
}

export interface IPrimeNGBarChartDataSetModel {
    label: string;
    backgroundColor: string;
    borderColor: string;
    data: Array<number>;
}

export interface IPrimeNGBarChartModel {
    labels: Array<string>;
    datasets: Array<IPrimeNGBarChartDataSetModel>
}