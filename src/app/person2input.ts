import { Address2Input } from './address2input';

export class Person2Input {
    voornaam: string;
    surname: string;
    age: number;
    address: Address2Input = new Address2Input();
    bank: string;
}

