import { UserRole } from "../UserRole";

export class UserDTO {
    id : number = -1;
    username : string = "";
    token : string = "";
    role: UserRole = new UserRole();
}
