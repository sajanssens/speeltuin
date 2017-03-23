import { Validatable } from './../validatable';

export abstract class Value<V> implements Validatable {
    protected value: V;

    constructor(value?: V) {
        this.value = value || null;
    }

    public isEmpty(): boolean {
        return this.value == null;
    }

    public isValid(): boolean {
        return !this.isEmpty();
    }

    public get(): V {
        return this.value;
    }

    public toString(): string {
        return (this.value == null) ? '' : this.value.toString();
    }

    // TODO
    // public equals(o: object): boolean {
    // if (this == o) return true;
    // if (!(o instanceof Value)) return false;

    // let other:Value<object>  = o;
    // return this.value != null ? value.equals(other.value) : other.value == null;

    //     return true;
    // }
    // public int hashCode() {
    //     return value != null ? value.hashCode() : 0;
    // }
}