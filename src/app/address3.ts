import { Address3Input } from './address3input';
export class Address3 {
    private constructor(
        private firstLine?: string,
        private secondLine?: string,
        private city?: string,        
        ) {
    }

    public static of(input: Address3Input): Address3 {
        return new Address3(input.firstLine, input.secondLine, input.city);
    }
}