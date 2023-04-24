export class EndPoints {
    static HOME_PAGE = "/"
    static CAR_TABLE = "/api/cars"
    static CUSTOMER_TABLE = "/api/customers"
    static SHIPMENT_TABLE = "/api/shipments"
    static PURCHASE_TABLE = "/api/purchases"
    static DISTRIBUTOR_TABLE = "/api/distributors"
    static CARSONPURCHASE_TABLE = "/api/carsonpurchases"
    
    static FIND_PATH = "/find"
    static AUTOCOMPLETE_PATH = "/autocomplete?query="
    static PAGE_REQUEST_PATH = "/paged"
    static GET_ELEMENT_COUNT_PATH = "/entity_count"

    static backendCarTableStatistic(count: number) {
        return EndPoints.CAR_TABLE + '/statistic/' + count
    }

    static VIRTUAL_CAR_TABLE_STATISTIC = "/statistics/cars"

    static VIRTUAL_CREATE = "/create"
    static VIRTUAL_DELETE = "/delete"
    static VIRTUAL_UPDATE = "/update"
}