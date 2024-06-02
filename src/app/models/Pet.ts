import User from "./User";

export default interface Pet {
    id: number;
    name: string;
    lastName: string;
    sex: string;
    birthdate: Date;
    specie: string;
    race: string;
    color: string;
    weight: number;
    size: string;
    onRegister: string;
    userId: User;
    healthRecords: any[];
}