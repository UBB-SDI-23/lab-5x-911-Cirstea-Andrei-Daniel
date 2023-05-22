import { User } from "./User";

export class UserChatMessage {
    id: number = -1;
    user: User = new User();
    date: Date = new Date();
    message: string = "";
}
