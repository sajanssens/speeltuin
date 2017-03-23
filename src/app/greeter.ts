import { format, getFormat } from './domain/objects/util';

export class Greeter {
    @format("Hello greeter %s")
    greeting: string;

    constructor(message: string) {
        this.greeting = message;
    }

    public greet(): string {        
        return getFormat(this, "greeting").replace("%s", this.greeting);
    }
}