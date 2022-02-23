export interface Contact {
    id: number;
    name: string;
    photo: string;
    lastname: string;
    position: string;
    email: string;
    city: string;
    company: string;
    channels: Channel[];
    checked: boolean;
  }
export interface Channel {
    id: number;
    name: string;
    value: string;
    preference: string;
  }
