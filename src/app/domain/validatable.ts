export interface Validatable {
    isValid(): boolean;// { return !this.isEmpty(); } // TODO?
    isEmpty(): boolean;// { return true; } // TODO?
}