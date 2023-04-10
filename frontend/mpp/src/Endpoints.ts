export class EndPoints {
    static HOME_PAGE = "/"
    static CAR_TABLE = "/api/cars"
    static CUSTOMER_TABLE = "/api/customers"
    static SHIPMENT_TABLE = "/api/shipments"
    static DISTRIBUTOR_TABLE = "/api/distributors"
    static CARSONPURCHASE_TABLE = "/api/carsonpurchases"
    
    static backendCarTableStatistic(count: number) {
        return EndPoints.CAR_TABLE + '/statistic/' + count
    }

    static VIRTUAL_CAR_TABLE_STATISTIC = "/statistics/cars"

    static VIRTUAL_CREATE = "/create"
    static VIRTUAL_DELETE = "/delete"
    static VIRTUAL_UPDATE = "/update"
}