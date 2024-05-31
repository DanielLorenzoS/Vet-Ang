import User from "./User";

interface Pet {
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
    onRegister: Date;
    user: User;
    healthRecords: any[];
}