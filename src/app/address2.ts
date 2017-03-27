import { Address2Input } from './address2input';

export class Address2 {
    private constructor(
        private firstLine?: string,
        private secondLine?: string,
        private city?: string,        
        ) {
    }

    public static of(input/*: Address2Input*/): Address2 {
        return new Address2(input['first-line'], input['second-line'], input.city);
    }
}