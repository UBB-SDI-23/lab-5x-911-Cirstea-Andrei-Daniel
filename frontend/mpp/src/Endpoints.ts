import { ServerSettings } from './components/ServerIP';
export class EndPoints {
    static LOGIN_PAGE = "/"
    static REGISTER_PAGE = "/register"
    static HOME_PAGE = "/home"
    static CAR_TABLE = "/api/cars"
    static CUSTOMER_TABLE = "/api/customers"
    static SHIPMENT_TABLE = "/api/shipments"
    static PURCHASE_TABLE = "/api/purchases"
    static DISTRIBUTOR_TABLE = "/api/distributors"
    static CARSONPURCHASE_TABLE = "/api/carsonpurchases"
    static USER_TABLE = "/api/users"
    static STATISTIC = "/statistic"
    static FILTER = "/filter"
    
    static BACKEND_LOGIN_SUFFIX = "/login"
    static BACKEND_REGISTER_SUFFIX = "/register"

    static backendUserChangeRole(id: string, new_role: string) : string {
        return ServerSettings.API_ENDPOINT + this.USER_TABLE + "/" + id + "/role" + new_role;
    }

    static backendGetUsers() : string {
        return ServerSettings.API_ENDPOINT + this.USER_TABLE;
    }

    static backendFind(table_endpoint: string, id: string | undefined) : string {
        return ServerSettings.API_ENDPOINT + this.frontendFind(table_endpoint, id);
    }

    static frontendFind(table_endpoint: string, id: string | undefined) : string {
        return table_endpoint + this.FIND_PATH + "/" + id;
    }

    static backendLogin() : string {
        return ServerSettings.API_ENDPOINT + this.USER_TABLE + this.BACKEND_LOGIN_SUFFIX;
    }

    static backendCodeRegister() : string {
        return ServerSettings.API_ENDPOINT + "/api" + this.BACKEND_REGISTER_SUFFIX;
    }

    static backendDirectRegister() : string {
        return ServerSettings.API_ENDPOINT + this.USER_TABLE + this.BACKEND_REGISTER_SUFFIX;
    }

    static backendConfirmCode(code: string) : string {
        return this.backendCodeRegister() + "/confirm/" + code;
    }

    static backendConfirmCodeAPIOnly(code: string) : string {
        return "/api" + this.BACKEND_REGISTER_SUFFIX + "/confirm/" + code;
    }

    static backendUserProfile(id: string) : string {
        return ServerSettings.API_ENDPOINT + this.USER_TABLE + "/find_profile/" + id;
    }

    static FIND_PATH = "/find"
    static AUTOCOMPLETE_PATH = "/autocomplete?query="
    static PAGE_REQUEST_PATH = "/paged"

    static VIRTUAL_CREATE = "/create"
    static VIRTUAL_DELETE = "/delete"
    static VIRTUAL_UPDATE = "/update"
}