
export type Level = "Beginner" | "Intermediate" | "Advanced";

export type Major = "CS" | "Math" | "Physics";

export interface Student {
  id: number;
  name: string;
  major: Major;
  grade: number;
  city: string;
}

export interface Address {
  city: string;
  street: string;
  suite: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}
