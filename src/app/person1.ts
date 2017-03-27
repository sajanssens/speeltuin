import { JsonProperty } from './domain/objects/util';
import { Address } from './address';
import { IBAN } from './domain/values/iban';

export class Person1 {
    @JsonProperty('voornaam')
    name: string;
    surname: string;
    age: number;

    @JsonProperty('address')
    address: Address;

    // Voor arrays:
    // @JsonProperty({clazz: Address})
    // address: Address[];

    // Werkt nog niet:
    @JsonProperty({clazz: IBAN})
    bank: IBAN;   

    // Default constructor will be called by mapper
    constructor() {
        this.name = undefined;
        this.surname = undefined;
        this.age = undefined;
        this.address = undefined;
        this.bank = undefined;
    }
}

