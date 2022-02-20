import { City } from "./city";

export interface Country {
    id: number;
    name: string;
    opened: boolean;
    cities: City[]
}