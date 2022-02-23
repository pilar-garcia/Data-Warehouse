export interface Contact {
    id: number;
    name: string;
    lastName: string;
    position: string;
    address: string;
    email: string;
    cityId: number;
    interes: string;
    companyId: number;
    Company: Field,
    City: Field,
    channels: Channel[];
    checked: boolean;
    photo: Blob;
  }
export interface Channel {
    id: number;
    name: string;
    value: string;
    preference: string;
  }

  export interface Field {
    name: string;
  }

