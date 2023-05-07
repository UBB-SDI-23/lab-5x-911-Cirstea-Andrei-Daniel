import { UserProfile } from "./UserProfile";

export class User {
    id: number = -1;
    username: string = "";
    email: string = "";
    password: string = "";
    roles: string[] = [];
    userProfile: UserProfile = new UserProfile();
}