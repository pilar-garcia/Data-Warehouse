import { Country } from "./country";

export interface Region {
    id: number;
    name: string;
    opened: boolean;
    countries: Country[]

}