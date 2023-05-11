export class UserProfileDTO {
    id: number = -1;
    description: string = "";
    location: string = "";
    birthday: Date = new Date();
    gender: string = "";
    phone_number: string = "";
    entity_count: number[] = [];
}