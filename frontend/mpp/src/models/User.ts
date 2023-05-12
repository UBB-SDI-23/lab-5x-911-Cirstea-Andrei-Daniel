import { UserRole } from "./UserRole";

export class User {
    id: number = -1;
    username: string = "";
    email: string = "";
    password: string = "";
    isEnabled : boolean = false;
    role: UserRole = new UserRole();
}