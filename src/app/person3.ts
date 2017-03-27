import { Address3 } from './address3';
import { Person3Input } from './person3input';
import { IBAN } from './domain/values/iban';

export class Person3 {

    private constructor(
        private name?: string,
        private surname?: string,
        private age?: number,
        private address?: Address3,
        private bank?: IBAN) {
    }

    public static of(input: Person3Input): Person3 {
        return new Person3(input.voornaam, input.surname, input.age, 
            Address3.of(input.address), IBAN.of(input.bank));
    }
}

