import { PetComponent } from "../pages/pet/pet/pet.component";
import Bill from "./Bill";

export default interface User {
    id: number;
    email: string;
    phone: string;
    city: string;
    municipality: string;
    street: string;
    number?: number;
    password: string;
    name: string;
    lastName: string;
    enabled: boolean;
    createdAt: string;
    idRole: number
}
