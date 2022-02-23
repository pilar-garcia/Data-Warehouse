import { Field } from "../contacts/contact";

export interface User {
    id: number;
    name: string;
    lastName: string;
    email: string;
    Rol: Field;
  }