import { Person2Input } from './person2input';
import { Address2 } from './address2';
import { IBAN } from './domain/values/iban';

export class Person2 {

    private constructor(
        private name?: string,
        private surname?: string,
        private age?: number,
        private address?: Address2,
        private bank?: IBAN) {
    }

    public static of(input): Person2 {
        return new Person2(input['voornaam'], input.surname, input.age,
            Address2.of(input.address), IBAN.of(input.bank));
    }
}

