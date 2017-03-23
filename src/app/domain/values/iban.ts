import { IJsonMetaData } from './../objects/util';
import { Value } from './value';


export class IBAN extends Value<string> implements IJsonMetaData<IBAN>{
    
    constructor(value?: string) {
        super(value);
        // console.log('IBAN.constructor: value='+this.value);
    }

    public static of(value: string): IBAN{
        // console.log('IBAN.of: value='+value);
        return new IBAN(value);
    }

    public static empty(): IBAN {
        return new IBAN('');
    }

    public  isValid(): boolean {
        return true;
        // return IBANValidator.getInstance().isValid((String)this.get()); TODO
    }
    

}