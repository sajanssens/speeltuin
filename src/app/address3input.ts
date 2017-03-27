import { JsonProperty } from './domain/objects/util';

export class Address3Input {
    @JsonProperty('first-line')
    firstLine: string;

    @JsonProperty('second-line')
    secondLine: string;

    city: string;

    // Default constructor will be called by mapper
    constructor() {
        this.firstLine = undefined;
        this.secondLine = undefined;
        this.city = undefined;
    }
}