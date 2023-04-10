export class EndPoints {
    static HOME_PAGE = "/"
    static CAR_TABLE = "/cars"
    static CUSTOMER_TABLE = "/customers"
    static SHIPMENT_TABLE = "/shipments"
    static DISTRIBUTOR_TABLE = "/distributors"
    static CARSONPURCHASE_TABLE = "/carsonpurchases"
    
    static backendCarTableStatistic(count: number) {
        return EndPoints.CAR_TABLE + '/statistic/' + count
    }

    static VIRTUAL_CAR_TABLE_STATISTIC = "/statistics/cars"

    static VIRTUAL_CREATE = "/create"
    static VIRTUAL_DELETE = "/delete"
    static VIRTUAL_UPDATE = "/update"
}