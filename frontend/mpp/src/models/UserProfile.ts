import { User } from "./User";

export class UserProfile {
    id: number = -1;
    description: string = "";
    location: string = "";
    birthday: Date = new Date();
    gender: string = "";
    phone_number: string = "";
    user: User = new User();
}