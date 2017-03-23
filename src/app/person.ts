import { Address } from './address';
import { IJsonMetaData } from './domain/objects/util';
import { IBAN } from './domain/values/iban';
import { JsonProperty } from './domain/objects/util';

export class Person {
    // @JsonProperty('voornaam')
    name: string;
    surname: string;
    age: number;

    // @JsonProperty({clazz: Address})
    // @JsonProperty('address')
    address: Address;

    @JsonProperty({clazz: IBAN})
    bank: IBAN;

    // @JsonProperty('bank')
    // bank: string;

    // Default constructor will be called by mapper
    constructor() {
        this.name = undefined;
        this.surname = undefined;
        this.age = undefined;
        this.address = undefined;
        this.bank = undefined;
    }
}

