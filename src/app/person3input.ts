import { Address3Input } from './address3input';
import { JsonProperty } from './domain/objects/util';

export class Person3Input {
    // @JsonProperty('voornaam')
    voornaam: string;
    surname: string;
    age: number;
    @JsonProperty('address')
    address: Address3Input;
    bank: string;

    constructor() {
        this.voornaam = undefined;
        this.surname = undefined;
        this.age = undefined;
        this.address = undefined;
        this.bank = undefined;
    }
}

